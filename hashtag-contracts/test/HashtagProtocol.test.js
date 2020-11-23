const _ = require('lodash');

const web3 = require('web3');
const {expect} = require('chai');

const {utils, BigNumber, constants} = ethers;

describe('HashtagProtocol Tests', function () {

  let creator, publisher, platform, nftContract, buyer1, another, random;
  this.timeout(0);

  let fee;
  let platformPercentage;

  const TEN_THOUSAND = BigNumber.from('10000');

  beforeEach(async function () {
    const accounts = await ethers.getSigners();

    creator = accounts[0];
    publisher = accounts[1];
    platform = accounts[2];
    nftContract = accounts[3];
    buyer1 = accounts[4];
    another = accounts[5];
    random = accounts[6];

    const HashtagAccessControls = await ethers.getContractFactory('HashtagAccessControls');
    const HashtagProtocol = await ethers.getContractFactory('HashtagProtocol');

    this.accessControls = await HashtagAccessControls.deploy();
    this.hashtagProtocol = await HashtagProtocol.deploy(this.accessControls.address, creator._address);

    // add a publisher to the protocol
    await this.accessControls.grantRole(web3.utils.sha3('PUBLISHER'), publisher._address);

    fee = await this.hashtagProtocol.fee();
    platformPercentage = await this.hashtagProtocol.platformPercentage();
  });

  describe('Validate setup', async function () {
    it('should have name and symbol', async function () {
      expect(await this.hashtagProtocol.name()).to.be.equal('Hashtag Protocol');
      expect(await this.hashtagProtocol.symbol()).to.be.equal('HASHTAG');
      expect(await this.hashtagProtocol.platform()).to.be.equal(creator._address);
      expect(platformPercentage).to.be.equal(9000);
    });
  });

  describe('Minting hashtags', async function () {
    describe('Validation', function () {
      const randomHashtag = 'asupersupersupersupersuperlonghashtag';

      it('should revert if exists (case-insensitive)', async function () {
        await this.hashtagProtocol.connect(publisher).mint('blockrocket', publisher._address, buyer1._address, {value: fee});

        await expect(this.hashtagProtocol.connect(publisher).mint('BlockRocket', publisher._address, buyer1._address, {value: fee}))
          .to.be.revertedWith('Hashtag validation: Hashtag already owned.');
      });

      it('should revert if hashtag does not meet min length requirements', async function () {
        const hashtagMinStringLength = await this.hashtagProtocol.hashtagMinStringLength();

        const shortHashtag = randomHashtag.substring(0, hashtagMinStringLength - 1);
        await expect(this.hashtagProtocol.connect(publisher).mint(shortHashtag, publisher._address, buyer1._address, {value: fee}))
          .to.be.revertedWith(`Invalid format: Hashtag must be at least ${hashtagMinStringLength} characters long`);
      });

      it('should revert if hashtag does not meet max length requirements', async function () {
        const hashtagMaxStringLength = await this.hashtagProtocol.hashtagMaxStringLength();

        const longHashtag = randomHashtag.substring(0, hashtagMaxStringLength + 1);
        await expect(this.hashtagProtocol.connect(publisher).mint(longHashtag, publisher._address, buyer1._address, {value: fee}))
          .to.be.revertedWith(`Invalid format: Hashtag must not exceed ${hashtagMaxStringLength} characters.`);
      });

      it('should revert if hashtag has an invalid character', async function () {
        const invalidHashtag = 'x_art';
        await expect(
          this.hashtagProtocol.connect(publisher).mint(invalidHashtag, publisher._address, buyer1._address, {value: fee}))
          .to.be.revertedWith('Invalid character found: Hashtag may only contain characters A-Z, a-z, 0-9');
      });

      it('should revert if the hashtag does not have a single alpha char', async function () {
        const invalidHashtag = '420';
        await expect(
          this.hashtagProtocol.connect(publisher).mint(invalidHashtag, publisher._address, buyer1._address, {value: fee}))
          .to.be.revertedWith('Invalid format: Hashtag must contain at least 1 alphabetic character.');
      });

      it('should allow a mix of upper and lowercase characters', async function () {
        await this.hashtagProtocol.connect(publisher).mint('Awesome123', publisher._address, buyer1._address, {value: fee});
      });
    });

    it('should mint with fee', async function () {
      expect(await this.hashtagProtocol.connect(buyer1).tokenPointer()).to.be.equal('0');

      const publisherEthBalance = await publisher.getBalance();
      const platformEthBalance = await creator.getBalance(); // aka platform
      const buyer1EthBalance = await buyer1.getBalance();

      const hashtag = 'BlockRocket';
      const lowerHashtag = 'blockrocket';

      const platformShare = fee.mul(platformPercentage).div(TEN_THOUSAND);
      const publisherShare = fee.mul(TEN_THOUSAND.sub(platformPercentage)).div(TEN_THOUSAND);

      await expect(this.hashtagProtocol.connect(random).mint(hashtag, publisher._address, buyer1._address, {value: fee}))
        .to.emit(this.hashtagProtocol, 'MintHashtag')
        .withArgs(
          constants.One,
          buyer1._address,
          lowerHashtag,
          hashtag,
          publisher._address,
          platformShare,
          publisherShare
        );

      expect(await this.hashtagProtocol.connect(buyer1).tokenPointer()).to.be.equal('1');
      expect(await this.hashtagProtocol.connect(buyer1).hashtagToTokenId(lowerHashtag)).to.be.equal('1');
      expect(await this.hashtagProtocol.connect(buyer1).displayHashtagToTokenId(hashtag)).to.be.equal('1');
      expect(await this.hashtagProtocol.exists(BigNumber.from('1'))).to.be.true;

      const hashtagData = await this.hashtagProtocol.connect(buyer1).tokenIdToHashtag('1');
      expect(hashtagData.value).to.be.equal(lowerHashtag);
      expect(hashtagData.displayVersion).to.be.equal(hashtag);
      expect(hashtagData.originalPublisher).to.be.equal(publisher._address);
      expect(hashtagData.creator).to.be.equal(random._address);
      expect(hashtagData.created).to.be.gt('0');

      expect(await creator.getBalance()).to.be.equal(platformEthBalance.add(platformShare));
      expect(await publisher.getBalance()).to.be.equal(publisherEthBalance.add(publisherShare));
      expect(await buyer1.getBalance()).to.be.equal(buyer1EthBalance);
    });

    it('should mint from owner without fee', async function () {
      expect(await this.hashtagProtocol.connect(buyer1).tokenPointer()).to.be.equal('0');

      await this.hashtagProtocol.connect(creator).mint('blockrocket', publisher._address, creator._address);

      expect(await this.hashtagProtocol.connect(buyer1).tokenPointer()).to.be.equal('1');
      expect(await this.hashtagProtocol.connect(buyer1).hashtagToTokenId('blockrocket')).to.be.equal('1');
      const hashtagData = await this.hashtagProtocol.connect(buyer1).tokenIdToHashtag('1');

      expect(hashtagData.value).to.be.equal('blockrocket');
      expect(hashtagData.originalPublisher).to.be.equal(publisher._address);
      expect(hashtagData.created).to.be.gt('0');
    });

    it('should revert if fee too low', async function () {
      await expect(this.hashtagProtocol.connect(publisher).mint('blockrocket', publisher._address, buyer1._address, {value: 0}))
        .to.be.revertedWith('Mint: Must send the platform fee');

      await expect(this.hashtagProtocol.connect(publisher).mint('blockrocket', publisher._address, buyer1._address, {value: utils.parseEther('0.0099999')}))
        .to.be.revertedWith('Mint: Must send the platform fee');
    });

    it('should revert if the publisher is not whitelisted', async function () {
      await expect(this.hashtagProtocol.connect(creator).mint('blockrocket', random._address, creator._address))
        .to.be.revertedWith('Mint: The publisher must be whitelisted');
    });
  });

  describe('Fee', async function () {
    it('should be able to set fee as owner', async function () {
      expect(await this.hashtagProtocol.connect(creator).fee()).to.be.equal(fee);

      await this.hashtagProtocol.connect(creator).setFee(utils.parseEther('3'));

      expect(await this.hashtagProtocol.connect(creator).fee()).to.be.equal(utils.parseEther('3'));
    });

    it('should revert if not owner', async function () {
      await expect(this.hashtagProtocol.connect(buyer1).setFee(utils.parseEther('3'))).to.be.revertedWith('Caller must be admin');
    });
  });

  describe('Platform', async function () {
    it('should be able to set platform as owner', async function () {
      expect(await this.hashtagProtocol.platform()).to.be.equal(creator._address);

      await this.hashtagProtocol.connect(creator).setPlatform(another._address);

      expect(await this.hashtagProtocol.platform()).to.be.equal(another._address);
    });

    it('should revert if not owner', async function () {
      await expect(this.hashtagProtocol.connect(buyer1).setPlatform(another._address)).to.be.revertedWith('Caller must be admin');
    });

    it('should be able to set platform percentage as owner', async function () {
      expect(await this.hashtagProtocol.platformPercentage()).to.be.equal(9000);

      await this.hashtagProtocol.connect(creator).setPlatformPercentage(5000);

      expect(await this.hashtagProtocol.platformPercentage()).to.be.equal(5000);
    });

    it('should revert if not owner', async function () {
      await expect(this.hashtagProtocol.connect(buyer1).setPlatformPercentage(11)).to.be.revertedWith('Caller must be admin');
    });
  });
});

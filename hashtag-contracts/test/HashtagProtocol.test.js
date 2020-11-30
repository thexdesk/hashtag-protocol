const web3 = require('web3');
const {expect} = require('chai');

const {utils, BigNumber, constants} = ethers;

describe('HashtagProtocol Tests', function () {

  let creator, creatorAddress, publisher, publisherAddress, buyer, buyerAddress, anotherAddress, random, randomAddress;

  beforeEach(async function () {
    const accounts = await ethers.getSigners();

    creator = accounts[0];
    creatorAddress = await accounts[0].getAddress();
    publisher = accounts[1];
    publisherAddress = await accounts[1].getAddress();
    buyer = accounts[4];
    buyerAddress = await accounts[4].getAddress();
    another = accounts[5];
    anotherAddress = await accounts[5].getAddress();
    random = accounts[6];
    randomAddress = await accounts[6].getAddress();

    const HashtagAccessControls = await ethers.getContractFactory('HashtagAccessControls');
    const HashtagProtocol = await ethers.getContractFactory('HashtagProtocol');

    this.accessControls = await HashtagAccessControls.deploy();
    this.hashtagProtocol = await HashtagProtocol.deploy(this.accessControls.address, creatorAddress);

    // add a publisher to the protocol
    await this.accessControls.grantRole(web3.utils.sha3('PUBLISHER'), publisherAddress);
  });

  describe('Validate setup', async function () {
    it('should have name and symbol', async function () {
      expect(await this.hashtagProtocol.name()).to.be.equal('Hashtag Protocol');
      expect(await this.hashtagProtocol.symbol()).to.be.equal('HASHTAG');
      expect(await this.hashtagProtocol.platform()).to.be.equal(creatorAddress);
    });
  });

  describe('Minting hashtags', async function () {
    describe('Validation', function () {
      const randomHashtag = 'asupersupersupersupersuperlonghashtag';

      it('should revert if exists (case-insensitive)', async function () {
        await this.hashtagProtocol.connect(publisher).mint('blockrocket', publisherAddress,);

        await expect(this.hashtagProtocol.connect(publisher).mint('BlockRocket', publisherAddress,))
          .to.be.revertedWith('Hashtag validation: Hashtag already owned.');
      });

      it('should revert if hashtag does not meet min length requirements', async function () {
        const hashtagMinStringLength = await this.hashtagProtocol.hashtagMinStringLength();

        const shortHashtag = randomHashtag.substring(0, hashtagMinStringLength - 1);
        await expect(this.hashtagProtocol.connect(publisher).mint(shortHashtag, publisherAddress,))
          .to.be.revertedWith(`Invalid format: Hashtag must be at least ${hashtagMinStringLength} characters long`);
      });

      it('should revert if hashtag does not meet max length requirements', async function () {
        const hashtagMaxStringLength = await this.hashtagProtocol.hashtagMaxStringLength();

        const longHashtag = randomHashtag.substring(0, hashtagMaxStringLength + 1);
        await expect(this.hashtagProtocol.connect(publisher).mint(longHashtag, publisherAddress,))
          .to.be.revertedWith(`Invalid format: Hashtag must not exceed ${hashtagMaxStringLength} characters.`);
      });

      it('should revert if hashtag has an invalid character', async function () {
        const invalidHashtag = 'x_art';
        await expect(
          this.hashtagProtocol.connect(publisher).mint(invalidHashtag, publisherAddress,))
          .to.be.revertedWith('Invalid character found: Hashtag may only contain characters A-Z, a-z, 0-9');
      });

      it('should revert if the hashtag does not have a single alpha char', async function () {
        const invalidHashtag = '420';
        await expect(
          this.hashtagProtocol.connect(publisher).mint(invalidHashtag, publisherAddress,))
          .to.be.revertedWith('Invalid format: Hashtag must contain at least 1 alphabetic character.');
      });

      it('should allow a mix of upper and lowercase characters', async function () {
        await this.hashtagProtocol.connect(publisher).mint('Awesome123', publisherAddress,);
      });
    });

    it('should mint', async function () {
      expect(await this.hashtagProtocol.tokenPointer()).to.be.equal('0');

      const hashtag = 'BlockRocket';
      const lowerHashtag = 'blockrocket';

      await expect(this.hashtagProtocol.connect(random).mint(hashtag, publisherAddress))
        .to.emit(this.hashtagProtocol, 'MintHashtag')
        .withArgs(
          constants.One,
          creatorAddress,
          lowerHashtag,
          hashtag,
          publisherAddress,
        );

      expect(await this.hashtagProtocol.tokenPointer()).to.be.equal('1');
      expect(await this.hashtagProtocol.hashtagToTokenId(lowerHashtag)).to.be.equal('1');
      expect(await this.hashtagProtocol.displayHashtagToTokenId(hashtag)).to.be.equal('1');
      expect(await this.hashtagProtocol.exists(BigNumber.from('1'))).to.be.true;

      const hashtagData = await this.hashtagProtocol.tokenIdToHashtag('1');
      expect(hashtagData.value).to.be.equal(lowerHashtag);
      expect(hashtagData.displayVersion).to.be.equal(hashtag);
      expect(hashtagData.originalPublisher).to.be.equal(publisherAddress);
      expect(hashtagData.creator).to.be.equal(randomAddress);
      expect(hashtagData.created).to.be.gt('0');
    });

    it('should mint from owner without fee', async function () {
      await this.hashtagProtocol.connect(creator);

      expect(await this.hashtagProtocol.tokenPointer()).to.be.equal('0');

      await this.hashtagProtocol.mint('blockrocket', publisherAddress);

      expect(await this.hashtagProtocol.tokenPointer()).to.be.equal('1');
      expect(await this.hashtagProtocol.hashtagToTokenId('blockrocket')).to.be.equal('1');
      const hashtagData = await this.hashtagProtocol.tokenIdToHashtag('1');

      expect(hashtagData.value).to.be.equal('blockrocket');
      expect(hashtagData.originalPublisher).to.be.equal(publisherAddress);
      expect(hashtagData.created).to.be.gt('0');
    });

    it('should revert if the publisher is not whitelisted', async function () {
      await expect(this.hashtagProtocol.connect(creator).mint('blockrocket', randomAddress))
        .to.be.revertedWith('Mint: The publisher must be whitelisted');
    });
  });

  describe('Platform', async function () {
    it('should be able to set platform as owner', async function () {
      expect(await this.hashtagProtocol.platform()).to.be.equal(creatorAddress);

      await this.hashtagProtocol.connect(creator).setPlatform(anotherAddress);

      expect(await this.hashtagProtocol.platform()).to.be.equal(anotherAddress);
    });

    it('should revert if not owner', async function () {
      await expect(this.hashtagProtocol.connect(buyer).setPlatform(anotherAddress)).to.be.revertedWith('Caller must be admin');
    });
  });

  describe('Metadata', async function () {
    it('should return tokenUri', async function () {
      const tokenId = constants.One;
      await this.hashtagProtocol.connect(random).mint('BlockRocket', publisherAddress,);

      expect(await this.hashtagProtocol.tokenURI(tokenId)).to.be.equal('');

      await this.hashtagProtocol.connect(creator).setBaseURI('hastag.io/');

      expect(await this.hashtagProtocol.tokenURI(tokenId)).to.be.equal(`hastag.io/${tokenId}`);

      await this.hashtagProtocol.connect(creator).setTokenURI(tokenId, 'hello');

      expect(await this.hashtagProtocol.tokenURI(tokenId)).to.be.equal(`hastag.io/hello`);
    });
  });
});

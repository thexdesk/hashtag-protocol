const web3 = require('web3');
const {expect} = require('chai');

const {utils, BigNumber, constants} = ethers;

describe.only('ERC721HashtagRegistry Tests', function () {

  let platform, platformAddress, publisher, publisherAddress;
  let buyer, buyerAddress, anotherAddress, random, randomAddress, tagger, taggerAddress;

  beforeEach(async function () {
    const accounts = await ethers.getSigners();

    platform = accounts[0];
    platformAddress = await accounts[0].getAddress();
    publisher = accounts[1];
    publisherAddress = await accounts[1].getAddress();
    buyer = accounts[4];
    buyerAddress = await accounts[4].getAddress();
    another = accounts[5];
    anotherAddress = await accounts[5].getAddress();
    random = accounts[6];
    randomAddress = await accounts[6].getAddress();
    tagger = accounts[7];
    taggerAddress = await accounts[7].getAddress();

    const HashtagAccessControls = await ethers.getContractFactory('HashtagAccessControls');
    const HashtagProtocol = await ethers.getContractFactory('HashtagProtocol');
    // const HashtagLinkSplitter = await ethers.getContractFactory('HashtagLinkSplitter');
    const ERC721HashtagRegistry = await ethers.getContractFactory('ERC721HashtagRegistry');
    const ERC721BurnableMock = await ethers.getContractFactory('ERC721BurnableMock');

    this.accessControls = await HashtagAccessControls.deploy();
    this.hashtagProtocol = await HashtagProtocol.deploy(this.accessControls.address, platformAddress);

    // add a publisher to the protocol
    await this.accessControls.grantRole(web3.utils.sha3('PUBLISHER'), publisherAddress);

    this.registry = await ERC721HashtagRegistry.deploy(this.accessControls.address, this.hashtagProtocol.address);

    this.nft = await ERC721BurnableMock.deploy('NFT', 'NFT');
    await this.nft.mint(); //#1
    await this.nft.mint(); //#2
  });

  describe('Validate setup', async function () {
    it('should have total tags of zero', async function () {
      expect(await this.registry.totalTags()).to.be.equal(0);
    });
  });

  describe('admin access', async function () {
    it('should set tag fee', async function () {
      await this.registry.connect(platform).setTagFee(utils.parseEther('1'));
      expect(await this.registry.tagFee()).to.be.equal(utils.parseEther('1'));

      await expect(this.registry.connect(random).setTagFee(utils.parseEther('1'))).to.be.reverted;
    });


    it('should update access controls', async function () {
      await this.registry.connect(platform).updateAccessControls(randomAddress);
      expect(await this.registry.accessControls()).to.be.equal(randomAddress);

      await expect(this.registry.connect(random).updateAccessControls(randomAddress)).to.be.reverted;
    });
  });

  describe('Add hashtag link', async function () {
    beforeEach(async function () {
      await this.hashtagProtocol.connect(tagger).mint('pussypower', publisherAddress, taggerAddress, {value: utils.parseEther('1')});
      this.hashtagId = await this.hashtagProtocol.hashtagToTokenId('#pussypower');
    });

    it('should be able to mint and tag', async function () {
      const nftId = constants.One;

      const macbookHashtagValue = "macbook";
      await expect(this.registry.connect(tagger).mintAndTag(
        macbookHashtagValue,
        this.nft.address,
        nftId,
        publisherAddress,
        taggerAddress,
        {value: utils.parseEther('0.01')}
      )).to.emit(this.registry, 'HashtagRegistered')
        .withArgs(
          taggerAddress,
          this.nft.address,
          publisherAddress,
          constants.Two,
          nftId,
          constants.One,
          utils.parseEther('0.01'),
        );

      const {
        _hashtagId,
        _nftContract,
        _nftId,
        _tagger,
        _tagstamp,
        _publisher
      } = await this.registry.getTagInfo(nftId);

      expect(_hashtagId).to.be.equal(constants.Two);
      expect(_nftContract).to.be.equal(this.nft.address);
      expect(_nftId).to.be.equal(nftId);
      expect(_tagger).to.be.equal(taggerAddress);
      expect(_tagstamp).to.exist;
      expect(Number(_tagstamp.toString())).to.be.gt(0);
      expect(_publisher).to.be.equal(publisherAddress);

      // check accrued values
      expect(await this.registry.accrued(publisherAddress)).to.be.equal(utils.parseEther('0.004')); // 40%
      expect(await this.registry.accrued(platformAddress)).to.be.equal(utils.parseEther('0.002')); // 20%
      expect(await this.registry.accrued(taggerAddress)).to.be.equal(utils.parseEther('0.004')); // 40%
    });

    it('should be able to tag a cryptokittie with #pussypower (pre-auction of #pussypower)', async function () {
      const nftId = constants.One;

      await expect(this.registry.connect(tagger).tag(
        this.hashtagId,
        this.nft.address,
        nftId,
        publisherAddress,
        taggerAddress,
        {value: utils.parseEther('0.01')}
      )).to.emit(this.registry, 'HashtagRegistered')
        .withArgs(
          taggerAddress,
          this.nft.address,
          publisherAddress,
          this.hashtagId,
          nftId,
          constants.One,
          utils.parseEther('0.01'),
        );

      expect(await this.registry.totalTags()).to.be.equal(1);

      const {
        _hashtagId,
        _nftContract,
        _nftId,
        _tagger,
        _tagstamp,
        _publisher
      } = await this.registry.getTagInfo(this.hashtagId);

      expect(_hashtagId).to.be.equal(this.hashtagId);
      expect(_nftContract).to.be.equal(this.nft.address);
      expect(_nftId).to.be.equal(nftId);
      expect(_tagger).to.be.equal(taggerAddress);
      expect(_tagstamp).to.exist;
      expect(Number(_tagstamp.toString())).to.be.gt(0);
      expect(_publisher).to.be.equal(publisherAddress);

      // check accrued values
      expect(await this.registry.accrued(publisherAddress)).to.be.equal(utils.parseEther('0.004')); // 40%
      expect(await this.registry.accrued(platformAddress)).to.be.equal(utils.parseEther('0.002')); // 20%
      expect(await this.registry.accrued(taggerAddress)).to.be.equal(utils.parseEther('0.004')); // 40%
    });

    it('should be able to tag a cryptokittie with #pussypower (pre and post auction of #pussypower)', async function () {
      // Tag pre auction and make sure that accrued values are correct
      const nftOneId = constants.One;
      await this.registry.connect(tagger).tag(
        this.hashtagId,
        this.nft.address,
        nftOneId,
        publisherAddress,
        taggerAddress,
        {value: utils.parseEther('0.01')}
      );

      expect(await this.registry.totalTags()).to.be.equal(1);

      // check accrued values
      expect(await this.registry.accrued(publisherAddress)).to.be.equal(utils.parseEther('0.004')); // 40%
      expect(await this.registry.accrued(platformAddress)).to.be.equal(utils.parseEther('0.002')); // 20%
      expect(await this.registry.accrued(taggerAddress)).to.be.equal(utils.parseEther('0.004')); // 40%

      await this.hashtagProtocol.connect(platform).transferFrom(platformAddress, buyerAddress, this.hashtagId);

      const nftTwoId = constants.Two;
      await this.registry.connect(tagger).tag(
        this.hashtagId,
        this.nft.address,
        nftTwoId,
        publisherAddress,
        taggerAddress,
        {value: utils.parseEther('0.01')}
      );

      expect(await this.registry.totalDue(publisherAddress)).to.be.equal(utils.parseEther('0.008'));
      expect(await this.registry.totalDue(platformAddress)).to.be.equal(utils.parseEther('0.004'));
      expect(await this.registry.totalDue(taggerAddress)).to.be.equal(utils.parseEther('0.004'));
      expect(await this.registry.totalDue(buyerAddress)).to.be.equal(utils.parseEther('0.004'));
    });

    it('Reverts when hashtag does not exist', async function () {
      await expect(
        this.registry.connect(publisher).tag(
          BigNumber.from('4'),
          this.nft.address,
          constants.One,
          publisherAddress,
          taggerAddress,
          {value: utils.parseEther('1')}
        )).to.be.revertedWith("The hashtag ID supplied is invalid - non-existent token!");
    });

    it('Reverts when zero address supplied as nft contract address', async function () {
      await expect(
        this.registry.connect(publisher).tag(
          this.hashtagId,
          constants.AddressZero,
          constants.One,
          publisherAddress,
          taggerAddress,
          {value: utils.parseEther('1')}
        )).to.be.revertedWith("Invalid nft contract address");
    });

    it('Reverts when hashtag nft contract address supplied for tag', async function () {
      await expect(
        this.registry.connect(publisher).tag(
          this.hashtagId,
          this.hashtagProtocol.address,
          this.hashtagId,
          publisherAddress,
          taggerAddress,
          {value: utils.parseEther('1')}
        )).to.be.revertedWith("Invalid tag - you are attempting to tag another hashtag");
    });

    it('Reverts when sending zero value', async function () {
      await expect(
        this.registry.tag(
          this.hashtagId,
          this.nft.address,
          this.hashtagId,
          publisherAddress,
          taggerAddress,
        )).to.be.revertedWith("Tag: You must send the fee");
    });

    it('Reverts when nft does not exist', async function () {
      await expect(
        this.registry.tag(
          this.hashtagId,
          this.nft.address,
          BigNumber.from('3'),
          publisherAddress,
          taggerAddress,
          {value: utils.parseEther('1')}
        )).to.be.revertedWith("ERC721: owner query for nonexistent token");
    });
  });

  describe('Drawing down', async function () {
    beforeEach(async function() {
      await this.hashtagProtocol.connect(tagger).mint('pussypower', publisherAddress, taggerAddress, {value: utils.parseEther('1')});
      this.hashtagId = await this.hashtagProtocol.hashtagToTokenId('#pussypower');

      const nftOneId = constants.One;
      await this.registry.connect(tagger).tag(
        this.hashtagId,
        this.nft.address,
        nftOneId,
        publisherAddress,
        taggerAddress,
        {value: utils.parseEther('0.01')}
      );
    });

    it('Can draw down on behalf of the platform', async function () {
      const platformBalanceBefore = (await platform.getBalance());
      await this.registry.connect(tagger).drawDown(platformAddress);
      const platformBalanceAfter = (await platform.getBalance());

      expect(platformBalanceAfter.sub(platformBalanceBefore)).to.be.equal(utils.parseEther('0.002'));
    });

    it.skip('Can draw down as the platform', async function () {
      const platformBalanceBefore = (await platform.getBalance());
      await this.registry.connect(platform).drawDown(platformAddress);
      const platformBalanceAfter = (await platform.getBalance());

      expect(platformBalanceAfter.sub(platformBalanceBefore)).to.be.equal(utils.parseEther('0.002'));
    });

    it('Does nothing after a double draw down', async function () {
      const platformBalanceBefore = (await platform.getBalance());
      await this.registry.connect(tagger).drawDown(platformAddress);
      const platformBalanceAfter = (await platform.getBalance());

      expect(platformBalanceAfter.sub(platformBalanceBefore)).to.be.equal(utils.parseEther('0.002'));

      const balanceBeforeSecondDraw = (await platform.getBalance());
      await this.registry.connect(tagger).drawDown(platformAddress);
      const balanceAfterSecondDraw = (await platform.getBalance());

      expect(balanceAfterSecondDraw.sub(balanceBeforeSecondDraw)).to.be.equal('0');
    });
  });
});

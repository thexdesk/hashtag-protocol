const web3 = require('web3');
const {expect} = require('chai');

const {utils, BigNumber, constants} = ethers;

describe('ERC721HashtagRegistry Tests', function () {

  let creator, creatorAddress, publisher, publisherAddress, buyer, buyerAddress, anotherAddress, random, randomAddress,
    tagger, taggerAddress;

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
    tagger = accounts[7];
    taggerAddress = await accounts[7].getAddress();

    const HashtagAccessControls = await ethers.getContractFactory('HashtagAccessControls');
    const HashtagProtocol = await ethers.getContractFactory('HashtagProtocol');
    // const HashtagLinkSplitter = await ethers.getContractFactory('HashtagLinkSplitter');
    const ERC721HashtagRegistry = await ethers.getContractFactory('ERC721HashtagRegistry');
    const ERC721BurnableMock = await ethers.getContractFactory('ERC721BurnableMock');

    this.accessControls = await HashtagAccessControls.deploy();
    this.hashtagProtocol = await HashtagProtocol.deploy(this.accessControls.address, creatorAddress);

    // add a publisher to the protocol
    await this.accessControls.grantRole(web3.utils.sha3('PUBLISHER'), publisherAddress);

    // this.splitter = await HashtagLinkSplitter.deploy(this.accessControls.address, this.hashtagProtocol.address);
    this.tagger = await ERC721HashtagRegistry.deploy(this.accessControls.address, this.hashtagProtocol.address);

    this.nft = await ERC721BurnableMock.deploy('NFT', 'NFT');
    await this.nft.mint();
  });

  describe('Validate setup', async function () {
    it('should have total tags of zero', async function () {
      expect(await this.tagger.totalTags()).to.be.equal(0);
    });
  });

  describe('admin access', async function () {
    it('should set tag fee', async function () {
      this.tagger.connect(creator).setTagFee(utils.parseEther('1'));
      expect(await this.tagger.tagFee()).to.be.equal(utils.parseEther('1'));

      await expect(this.tagger.connect(random).setTagFee(utils.parseEther('1'))).to.be.reverted;
    });

    // it('should update splitter', async function () {
    //   this.tagger.connect(creator).updateSplitter(randomAddress);
    //   expect(await this.tagger.splitter()).to.be.equal(randomAddress);
    //
    //   await expect(this.tagger.connect(random).updateSplitter(randomAddress)).to.be.reverted;
    // });

    it('should update access controls', async function () {
      this.tagger.connect(creator).updateAccessControls(randomAddress);
      expect(await this.tagger.accessControls()).to.be.equal(randomAddress);

      await expect(this.tagger.connect(random).updateAccessControls(randomAddress)).to.be.reverted;
    });
  });

  describe('Add hashtag link', async function () {
    beforeEach(async function () {
      await this.hashtagProtocol.connect(publisher).mint('pussypower', publisherAddress, {value: utils.parseEther('1')});
      this.hashtagId = await this.hashtagProtocol.hashtagToTokenId('pussypower');
    });

    it('should be able to mint and tag', async function () {
      const nftId = constants.One;

      const macbookHashtagValue = "macbook";
      await expect(this.tagger.connect(tagger).mintAndTag(
        macbookHashtagValue,
        this.nft.address,
        nftId,
        publisherAddress,
        taggerAddress,
        {value: utils.parseEther('0.02')}
      )).to.emit(this.tagger, 'HashtagRegistered')
        .withArgs(
          taggerAddress,
          this.nft.address,
          publisherAddress,
          constants.Two,
          nftId,
          utils.parseEther('0.01'),
        );

      const {
        _hashtagId,
        _nftContract,
        _nftId,
        _tagger,
        _tagstamp,
        _publisher
      } = await this.tagger.getTagInfo(nftId);

      expect(_hashtagId).to.be.equal(constants.Two);
      expect(_nftContract).to.be.equal(this.nft.address);
      expect(_nftId).to.be.equal(nftId);
      expect(_tagger).to.be.equal(taggerAddress);
      expect(_tagstamp).to.exist;
      expect(Number(_tagstamp.toString())).to.be.gt(0);
      expect(_publisher).to.be.equal(publisherAddress);
    });

    it('should be able to tag a cryptokittie with #pussypower', async function () {
      const nftId = constants.One;

      await expect(this.tagger.connect(tagger).tag(
        this.hashtagId,
        this.nft.address,
        nftId,
        publisherAddress,
        taggerAddress,
        {value: utils.parseEther('0.01')}
      )).to.emit(this.tagger, 'HashtagRegistered')
        .withArgs(
          taggerAddress,
          this.nft.address,
          publisherAddress,
          this.hashtagId,
          nftId,
          utils.parseEther('0.01'),
        );

      expect(await this.tagger.totalTags()).to.be.equal(1);

      const {
        _hashtagId,
        _nftContract,
        _nftId,
        _tagger,
        _tagstamp,
        _publisher
      } = await this.tagger.getTagInfo(this.hashtagId);

      expect(_hashtagId).to.be.equal(this.hashtagId);
      expect(_nftContract).to.be.equal(this.nft.address);
      expect(_nftId).to.be.equal(nftId);
      expect(_tagger).to.be.equal(taggerAddress);
      expect(_tagstamp).to.exist;
      expect(Number(_tagstamp.toString())).to.be.gt(0);
      expect(_publisher).to.be.equal(publisherAddress);
    });

    it('Reverts when hashtag does not exist', async function () {
      await expect(
        this.tagger.connect(publisher).tag(
          BigNumber.from('3'),
          this.nft.address,
          constants.One,
          publisherAddress,
          taggerAddress,
          {value: utils.parseEther('1')}
        )).to.be.revertedWith("The hashtag ID supplied is invalid - non-existent token!");
    });

    it('Reverts when zero address supplied as nft contract address', async function () {
      await expect(
        this.tagger.connect(publisher).tag(
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
        this.tagger.connect(publisher).tag(
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
        this.tagger.tag(
          this.hashtagId,
          this.nft.address,
          this.hashtagId,
          publisherAddress,
          taggerAddress,
        )).to.be.revertedWith("Tag: You must send the fee");
    });

    it('Reverts when nft does not exist', async function () {
      await expect(
        this.tagger.tag(
          this.hashtagId,
          this.nft.address,
          constants.Two,
          publisherAddress,
          taggerAddress,
          {value: utils.parseEther('1')}
        )).to.be.revertedWith("ERC721: owner query for nonexistent token");
    });
  });
});

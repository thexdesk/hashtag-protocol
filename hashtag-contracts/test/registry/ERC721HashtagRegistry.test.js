const {BN, constants, expectEvent, expectRevert, ether, balance} = require('@openzeppelin/test-helpers');
const {accounts, contract, web3} = require('@openzeppelin/test-environment');
const [creator, platform, publisher, tagger, buyer1] = accounts;

const {expect} = require('chai');

const HashtagAccessControls = contract.fromArtifact('HashtagAccessControls');
const HashtagLinkSplitter = contract.fromArtifact('HashtagLinkSplitter');
const HashtagProtocol = contract.fromArtifact('HashtagProtocol');
const ERC721BurnableMock = contract.fromArtifact('ERC721BurnableMock');
const ERC721HashtagRegistry = contract.fromArtifact('ERC721HashtagRegistry');

describe('ERC721HashtagRegistry Tests', function () {
    this.timeout(0);

    const tagIdOne = new BN('1');
    const nftIdOne = new BN('1');

    beforeEach(async function () {
        this.accessControls = await HashtagAccessControls.new({from: creator});
        this.hashtagProtocol = await HashtagProtocol.new(this.accessControls.address, platform, {from: creator});

        // add a publisher to the protocol
        await this.accessControls.grantRole(web3.utils.sha3('PUBLISHER'), publisher, {from: creator});

        this.splitter = await HashtagLinkSplitter.new(this.accessControls.address, this.hashtagProtocol.address, {from: creator});
        this.tagger = await ERC721HashtagRegistry.new(this.accessControls.address, this.hashtagProtocol.address, this.splitter.address, {from: creator});

        this.nft = await ERC721BurnableMock.new('NFT', 'NFT', {from: creator});
        await this.nft.mint();
    });

    describe('Validate setup', async function () {
        it('should have total tags of zero', async function () {
            expect(await this.tagger.totalTags()).to.be.bignumber.equal('0');
        });
    });

    describe('Add hashtag link', async function () {
        beforeEach(async function() {
            await this.hashtagProtocol.mint('pussypower', publisher, buyer1, {from: publisher, value: ether('1')});
            this.hashtagId = await this.hashtagProtocol.hashtagToTokenId('pussypower');
        });

        it('should be able to mint and tag', async function() {
            const nftId = new BN('1');

            const macbookHashtagValue = "macbook";
            const {receipt} = await this.tagger.mintAndTag(
                macbookHashtagValue,
                this.nft.address,
                nftId,
                publisher,
                tagger,
                {from: tagger, value: ether('0.02')}
            );

            const hashtagId = await this.hashtagProtocol.hashtagToTokenId(macbookHashtagValue);

            await expectEvent(receipt, 'HashtagRegistered', {
                tagger:  tagger,
                nftContract: this.nft.address,
                publisher: publisher,
                hashtagId,
                nftId: nftId,
                platformFee: ether('0.0005'),
                publisherFee: ether('0.0005'),
                hashtagFee: ether('0.009'),
            });

            const {
                _hashtagId,
                _nftContract,
                _nftId,
                _tagger,
                _tagstamp,
                _publisher
            } = await this.tagger.getTagInfo(tagIdOne);

            expect(_hashtagId).to.be.bignumber.equal(hashtagId);
            expect(_nftContract).to.be.equal(this.nft.address);
            expect(_nftId).to.be.bignumber.equal(nftId);
            expect(_tagger).to.be.equal(tagger);
            expect(_tagstamp).to.exist;
            expect(Number(_tagstamp.toString())).to.be.gt(0);
            expect(_publisher).to.be.equal(publisher);
        });

        it('should be able to tag a cryptokittie with #pussypower', async function () {
            const nftId = new BN('1');

            const {receipt} = await this.tagger.tag(
                this.hashtagId,
                this.nft.address,
                nftId,
                publisher,
                tagger,
                {from: tagger, value: ether('0.01')}
            );

            await expectEvent(receipt, 'HashtagRegistered', {
                tagger:  tagger,
                nftContract: this.nft.address,
                publisher: publisher,
                hashtagId: this.hashtagId,
                nftId: nftId,
                platformFee: ether('0.0005'),
                publisherFee: ether('0.0005'),
                hashtagFee: ether('0.009'),
            });

            expect(await this.tagger.totalTags()).to.be.bignumber.equal('1');

            const {
                _hashtagId,
                _nftContract,
                _nftId,
                _tagger,
                _tagstamp,
                _publisher
            } = await this.tagger.getTagInfo(tagIdOne);

            expect(_hashtagId).to.be.bignumber.equal(this.hashtagId);
            expect(_nftContract).to.be.equal(this.nft.address);
            expect(_nftId).to.be.bignumber.equal(nftId);
            expect(_tagger).to.be.equal(tagger);
            expect(_tagstamp).to.exist;
            expect(Number(_tagstamp.toString())).to.be.gt(0);
            expect(_publisher).to.be.equal(publisher);

            const hashtagTagIds = await this.tagger.getAllTagIdsForAGivenHashtag(this.hashtagId);
            expect(hashtagTagIds).to.exist;
            expect(hashtagTagIds.length).to.be.equal(1);
            expect(hashtagTagIds[0]).to.be.bignumber.equal(tagIdOne);

            const nftTagIds = await this.tagger.getAllTagIdsForAGivenNft(this.nft.address, nftId);
            expect(nftTagIds).to.exist;
            expect(nftTagIds.length).to.be.equal(1);
            expect(nftTagIds[0]).to.be.bignumber.equal(tagIdOne);

            const publisherTagIds = await this.tagger.getAllTagIdsForAGivenPublisher(publisher);
            expect(publisherTagIds).to.exist;
            expect(publisherTagIds.length).to.be.equal(1);
            expect(publisherTagIds[0]).to.be.bignumber.equal(tagIdOne);

            const taggerTagIds = await this.tagger.getAllTagIdsForAGivenTagger(tagger);
            expect(taggerTagIds).to.exist;
            expect(taggerTagIds.length).to.be.equal(1);
            expect(taggerTagIds[0]).to.be.bignumber.equal(tagIdOne);
        });

        it('Reverts when hashtag does not exist', async function() {
            await expectRevert(
                this.tagger.tag(
                    new BN('3'),
                    this.nft.address,
                    nftIdOne,
                    publisher,
                    tagger,
                    {from: publisher, value: ether('1')}
                ),
                "The hashtag ID supplied is invalid - non-existent token!"
            );
        });

        it('Reverts when zero address supplied as nft contract address', async function() {
           await expectRevert(
               this.tagger.tag(
                   this.hashtagId,
                   constants.ZERO_ADDRESS,
                   nftIdOne,
                   publisher,
                   tagger,
                   {from: publisher, value: ether('1')}
               ),
               "Invalid nft contract address"
           );
        });

        it('Reverts when hashtag nft contract address supplied for tag', async function() {
           await expectRevert(
               this.tagger.tag(
                   this.hashtagId,
                   this.hashtagProtocol.address,
                   this.hashtagId,
                   publisher,
                   tagger,
                   {from: publisher, value: ether('1')}
               ),
               "Invalid tag - you are attempting to tag another hashtag"
           );
        });

        it('Reverts when sending zero value', async function() {
            await expectRevert(
                this.tagger.tag(
                    this.hashtagId,
                    this.nft.address,
                    nftIdOne,
                    publisher,
                    tagger,
                    {from: publisher}
                ),
                "Tag: You must send the fee."
            );
        });

        it('Reverts when nft does not exist', async function() {
            await expectRevert(
                this.tagger.tag(
                    this.hashtagId,
                    this.nft.address,
                    new BN('2'),
                    publisher,
                    tagger,
                    {from: publisher, value: ether('0.1')}
                ),
                "ERC721: owner query for nonexistent token."
            );
        });
    });
});

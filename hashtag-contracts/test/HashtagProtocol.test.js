const _ = require('lodash');
const {BN, constants, expectEvent, expectRevert, ether, balance} = require('@openzeppelin/test-helpers');
const { accounts, contract, web3 } = require('@openzeppelin/test-environment');
const [ creator, publisher, platform, nftContract, buyer1, another, random ] = accounts;

const {contracts} = require('../test-environment.config');
const gasPriceAsBN = new BN(contracts.defaultGasPrice.toString());
const gasUsedCalc = (logs) => {
    return gasPriceAsBN.mul(new BN(logs.receipt.gasUsed));
};

const {expect} = require('chai');

const HashtagAccessControls = contract.fromArtifact('HashtagAccessControls');
const HashtagProtocol = contract.fromArtifact('HashtagProtocol');

describe('HashtagProtocol Tests', function () {
    this.timeout(0);

    let fee;
    let platformPercentage;

    const TEN_THOUSAND = new BN(10000);

    beforeEach(async function () {
        this.accessControls = await HashtagAccessControls.new({from: creator});
        this.hashtagProtocol = await HashtagProtocol.new(this.accessControls.address, creator, {from: creator});

        // add a publisher to the protocol
        await this.accessControls.grantRole(web3.utils.sha3('PUBLISHER'), publisher, {from: creator});

        fee = await this.hashtagProtocol.fee();
        platformPercentage = await this.hashtagProtocol.platformPercentage();
    });

    describe('Validate setup', async function () {
        it('should have name and symbol', async function () {
            expect(await this.hashtagProtocol.name()).to.be.equal('Hashtag Protocol');
            expect(await this.hashtagProtocol.symbol()).to.be.equal('HASHTAG');
            expect(await this.hashtagProtocol.platform()).to.be.equal(creator);
            expect(await this.hashtagProtocol.platformPercentage()).to.be.bignumber.equal(new BN(9000));
        });
    });

    describe('Minting hashtags', async function () {
        describe('Validation', function() {
            const randomHashtag = 'asupersupersupersupersuperlonghashtag';

            it('should revert if exists (case-insensitive)', async function () {
                await this.hashtagProtocol.mint('blockrocket', publisher, buyer1, {from: publisher, value: fee});

                await expectRevert(this.hashtagProtocol.mint('BlockRocket', publisher, buyer1, {
                    from: publisher,
                    value: ether('0.1')
                }), 'Hashtag validation: Hashtag already owned.');
            });

            it('should revert if hashtag does not meet min length requirements', async function() {
                const hashtagMinStringLength = await this.hashtagProtocol.hashtagMinStringLength();

                const shortHashtag = randomHashtag.substring(0, hashtagMinStringLength-1);
                await expectRevert(
                    this.hashtagProtocol.mint(shortHashtag, publisher, buyer1, {from: publisher, value: fee}),
                    `Invalid format: Hashtag must be at least ${hashtagMinStringLength} characters long`
                );
            });

            it('should revert if hashtag does not meet max length requirements', async function() {
                const hashtagMaxStringLength = await this.hashtagProtocol.hashtagMaxStringLength();

                const longHashtag = randomHashtag.substring(0, hashtagMaxStringLength+1);
                await expectRevert(
                    this.hashtagProtocol.mint(longHashtag, publisher, buyer1, {from: publisher, value: fee}),
                    `Invalid format: Hashtag must not exceed ${hashtagMaxStringLength} characters.`
                );
            });

            it('should revert if hashtag has an invalid character', async function() {
                const invalidHashtag = 'x_art';
                await expectRevert(
                    this.hashtagProtocol.mint(invalidHashtag, publisher, buyer1, {from: publisher, value: fee}),
                    'Invalid character found: Hashtag may only contain characters A-Z, a-z, 0-9'
                );
            });

            it('should revert if the hashtag does not have a single alpha char', async function() {
                const invalidHashtag = '420';
                await expectRevert(
                    this.hashtagProtocol.mint(invalidHashtag, publisher, buyer1, {from: publisher, value: fee}),
                    'Invalid format: Hashtag must contain at least 1 alphabetic character.'
                );
            });

            it('should allow a mix of upper and lowercase characters', async function() {
                await this.hashtagProtocol.mint('Awesome123', publisher, buyer1, {from: publisher, value: fee});
            });
        });

        it('should mint with fee', async function () {
            expect(await this.hashtagProtocol.tokenPointer({from: buyer1})).to.be.bignumber.equal('0');

            const publisherTracker = await balance.tracker(publisher);
            const platformTracker = await balance.tracker(creator); // aka platform
            const preMintBuyer1Balance = await balance.current(buyer1);

            const hashtag = 'BlockRocket';
            const lowerHashtag = 'blockrocket';
            const {receipt} = await this.hashtagProtocol.mint(hashtag, publisher, buyer1, {from: random, value: fee});

            const platformShare = fee.mul(platformPercentage).div(TEN_THOUSAND);
            const publisherShare = fee.mul(TEN_THOUSAND.sub(platformPercentage)).div(TEN_THOUSAND);
            await expectEvent(receipt, 'MintHashtag', {
                tokenId: new BN('1'),
                owner: buyer1,
                hashtag: lowerHashtag,
                displayHashtag: hashtag,
                publisher: publisher,
                platformFee: platformShare,
                publisherFee: publisherShare
            });

            expect(await this.hashtagProtocol.tokenPointer({from: buyer1})).to.be.bignumber.equal('1');
            expect(await this.hashtagProtocol.hashtagToTokenId(lowerHashtag, {from: buyer1})).to.be.bignumber.equal('1');
            expect(await this.hashtagProtocol.displayHashtagToTokenId(hashtag, {from: buyer1})).to.be.bignumber.equal('1');
            expect(await this.hashtagProtocol.exists(new BN('1'))).to.be.true;

            const hashtagData = await this.hashtagProtocol.tokenIdToHashtag('1', {from: buyer1});
            const cleanHashtagData = _.omit(hashtagData, 'created', '0', '1', '2', '3', '4');
            expect(cleanHashtagData).to.be.deep.equal({
                value: lowerHashtag,
                displayVersion: hashtag,
                originalPublisher: publisher,
                creator: random
            });

            expect((await this.hashtagProtocol.tokenIdToHashtag('1', {from: buyer1})).created).to.be.bignumber.gt('0');

            expect(await platformTracker.delta()).to.be.bignumber.equal(platformShare);
            expect(await publisherTracker.delta()).to.be.bignumber.equal(publisherShare);

            const postMintBuyer1Balance = await balance.current(buyer1);
            expect(postMintBuyer1Balance).to.be.bignumber.equal(preMintBuyer1Balance);
        });

        it('should mint from owner without fee', async function () {
            expect(await this.hashtagProtocol.tokenPointer({from: buyer1})).to.be.bignumber.equal('0');

            await this.hashtagProtocol.mint('blockrocket', publisher, creator, {from: creator});

            expect(await this.hashtagProtocol.tokenPointer({from: buyer1})).to.be.bignumber.equal('1');
            expect(await this.hashtagProtocol.hashtagToTokenId('blockrocket', {from: buyer1})).to.be.bignumber.equal('1');
            expect(await this.hashtagProtocol.tokenIdToHashtag('1', {from: buyer1})).to.include({
                value: 'blockrocket',
                originalPublisher: publisher
            });
            expect((await this.hashtagProtocol.tokenIdToHashtag('1', {from: buyer1})).created).to.be.bignumber.gt('0');
        });

        it('should revert if fee too low', async function () {
            await expectRevert(this.hashtagProtocol.mint('blockrocket', publisher, buyer1, {
                from: publisher,
                value: ether('0')
            }), 'Mint: Must send the platform fee.');
            await expectRevert(this.hashtagProtocol.mint('BlockRocket', publisher, buyer1, {
                from: publisher,
                value: ether('0.0099999')
            }), 'Mint: Must send the platform fee.');
        });

        it('should revert if the publisher is not whitelisted', async function () {
           await expectRevert(
               this.hashtagProtocol.mint('blockrocket', random, creator, {from: creator}),
             'Mint: The publisher must be whitelisted'
           );
        });
    });

    describe('Fee', async function () {
        it('should be able to set fee as owner', async function () {
            expect(await this.hashtagProtocol.fee({from: creator})).to.be.bignumber.equal(fee);

            await this.hashtagProtocol.setFee(ether('3'), {from: creator});

            expect(await this.hashtagProtocol.fee({from: creator})).to.be.bignumber.equal(ether('3'));
        });

        it('should revert if not owner', async function () {
            await expectRevert(this.hashtagProtocol.setFee(ether('3'), {from: buyer1}), 'Caller must be admin.');
        });
    });

    describe('Platform', async function () {
        it('should be able to set platform as owner', async function () {
            expect(await this.hashtagProtocol.platform()).to.be.equal(creator);

            await this.hashtagProtocol.setPlatform(another, {from: creator});

            expect(await this.hashtagProtocol.platform()).to.be.equal(another);
        });

        it('should revert if not owner', async function () {
            await expectRevert(this.hashtagProtocol.setPlatform(another, {from: buyer1}), 'Caller must be admin.');
        });

        it('should be able to set platform percentage as owner', async function () {
            expect(await this.hashtagProtocol.platformPercentage()).to.be.bignumber.equal(new BN(9000));

            await this.hashtagProtocol.setPlatformPercentage(5000, {from: creator});

            expect(await this.hashtagProtocol.platformPercentage()).to.be.bignumber.equal(new BN(5000));
        });

        it('should revert if not owner', async function () {
            await expectRevert(this.hashtagProtocol.setPlatformPercentage(11, {from: buyer1}), 'Caller must be admin.');
        });
    });
});

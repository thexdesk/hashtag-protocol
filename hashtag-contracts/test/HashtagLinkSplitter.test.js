const {BN, ether, balance, expectRevert} = require('@openzeppelin/test-helpers');
const {accounts, contract, web3} = require('@openzeppelin/test-environment');
const [creator, publisher, buyer1, platformAddress] = accounts;

const {expect} = require('chai');

const HashtagAccessControls = contract.fromArtifact('HashtagAccessControls');
const HashtagProtocol = contract.fromArtifact('HashtagProtocol');
const HashtagLinkSplitter = contract.fromArtifact('HashtagLinkSplitter');

describe('HashtagLinkSplitter Tests', function () {
    this.timeout(0);

    beforeEach(async function () {
        this.accessControls = await HashtagAccessControls.new({from: creator});
        this.hashtagProtocol = await HashtagProtocol.new(this.accessControls.address, platformAddress, {from: creator});
        this.splitter = await HashtagLinkSplitter.new(this.accessControls.address, this.hashtagProtocol.address, {from: creator});

        this.nftContract = publisher;

        // add a publisher to the protocol
        await this.accessControls.grantRole(web3.utils.sha3('PUBLISHER'), publisher, {from: creator});

        await this.hashtagProtocol.mint('pussypower', publisher, buyer1, {from: publisher, value: ether('1')});
        this.tokenId = await this.hashtagProtocol.hashtagToTokenId('pussypower');
    });

    describe('setup correctly', async function () {
        it('Protocol is defined', async function () {
            const protocol = await this.splitter.hashtagProtocol();
            expect(protocol).to.be.equal(this.hashtagProtocol.address);
        });
    });

    describe('Splitting funds', async function () {
        it('Funds are split accordingly', async function () {
            const {_platform, _owner} = await this.hashtagProtocol.getPaymentAddresses(this.tokenId);

            const platformTracker = await balance.tracker(_platform);
            const publisherTracker = await balance.tracker(this.nftContract);
            const ownerTracker = await balance.tracker(_owner);

            await this.splitter.handlePayment(this.tokenId, this.nftContract, {value: ether('1')});

            const platformDelta = await platformTracker.delta();
            const publisherDelta = await publisherTracker.delta();
            const ownerDelta = await ownerTracker.delta();

            expect(platformDelta).to.be.bignumber.equal(
                ether('1').div(new BN('10000')).mul(new BN('500')) // 5%
            );
            expect(platformDelta).to.be.bignumber.equal(
                ether('0.05') // 5%
            );

            expect(publisherDelta).to.be.bignumber.equal(
                ether('1').div(new BN('10000')).mul(new BN('500')) // 5%
            );

            expect(publisherDelta).to.be.bignumber.equal(
                ether('0.05') // 5%
            );

            expect(ownerDelta).to.be.bignumber.equal(
                ether('1').div(new BN('10000')).mul(new BN('9000')) // 90%
            );

            expect(ownerDelta).to.be.bignumber.equal(
                ether('0.9') // 90%
            );
        });
    });

    describe('Updating splits', async function () {
        it('fails to update if not owner', async function () {
            await expectRevert(
                this.splitter.updateSplits(5000, 2500, 2500),
                'Caller must be admin'
            );
        });

        it('fails to update if does not equal 100%', async function () {
            await expectRevert(
                this.splitter.updateSplits(4999, 2500, 2500, {from: creator}),
                'Splitter: incorrect percentages supplied'
            );
        });

        it('can update values if owner', async function () {
            expect(await this.splitter.platformPercentage()).to.be.bignumber.equal('500');
            expect(await this.splitter.publisherPercentage()).to.be.bignumber.equal('500');
            expect(await this.splitter.tagOwnerPercentage()).to.be.bignumber.equal('9000');

            await this.splitter.updateSplits(5000, 2500, 2500, {from: creator});

            expect(await this.splitter.platformPercentage()).to.be.bignumber.equal('5000');
            expect(await this.splitter.publisherPercentage()).to.be.bignumber.equal('2500');
            expect(await this.splitter.tagOwnerPercentage()).to.be.bignumber.equal('2500');
        });
    });
});

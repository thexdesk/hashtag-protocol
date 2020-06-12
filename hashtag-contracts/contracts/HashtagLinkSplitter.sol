pragma solidity 0.6.6;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/GSN/Context.sol";
import "./HashtagAccessControls.sol";
import "./HashtagProtocol.sol";

/**
 * @title Hashtag Link Commission Splitting Contract
 * @notice Abstracts the remuneration logic when tagging an NFT asset
 * @author Hashtag Protocol
*/
contract HashtagLinkSplitter is Context {
    using SafeMath for uint256;

    uint256 constant public modulo = 10000;
    uint256 public platformPercentage = 500; //5%
    uint256 public publisherPercentage = 500; //5%
    uint256 public tagOwnerPercentage = 9000; //90%

    HashtagAccessControls public accessControls;
    HashtagProtocol public hashtagProtocol;

    /**
     * @notice Admin only execution guard
     * @dev When applied to a method, only allows execution when the sender has the admin role
    */
    modifier onlyAdmin() {
        bytes32 adminRole = 0x00;
        require(accessControls.hasRole(adminRole, _msgSender()), "Caller must be admin");
        _;
    }

    constructor (HashtagAccessControls _accessControls, HashtagProtocol _hashtagProtocol) public {
        accessControls = _accessControls;
        hashtagProtocol = _hashtagProtocol;
    }

    /**
     * @notice For a given hashtag and a publisher, splits the commission as defined by the split configuration
     * @param _tokenId ID of the hashtag
     * @param _publisher Address of the publisher that handled the linking / tagging
    */
    function handlePayment(uint256 _tokenId, address _publisher) external payable returns (uint256 _platformFee, uint256 _publisherFee, uint256 _hashtagFee) {
        (address payable platform,
        address payable owner) = hashtagProtocol.getPaymentAddresses(_tokenId);

        uint256 platformFee = msg.value.div(modulo).mul(platformPercentage);
        (bool platformSuccess,) = platform.call{value: platformFee}("");
        require(platformSuccess, "Splitter: unable to send value to platform");

        uint256 publisherFee = msg.value.div(modulo).mul(publisherPercentage);
        (bool publisherSuccess,) = _publisher.call{value: publisherFee}("");
        require(publisherSuccess, "Splitter: unable to send value to publisher");

        uint256 hashtagFee = msg.value.sub(publisherFee).sub(platformFee);
        (bool ownerSuccess,) = owner.call{value: hashtagFee}("");
        require(ownerSuccess, "Splitter: unable to send value to token owner");

        return (platformFee, publisherFee, hashtagFee);
    }

    /**
     * @notice Admin functionality for updating how value should be split between the appropriate parties
     * @param _platformPercentage Percentage of a commission split that the protocol should receive
     * @param  _publisherPercentage Percentage of a commission split that a publisher should receive
     * @param _tagOwnerPercentage Percentage of a commission split that a hashtag owner should receive
    */
    function updateSplits(uint256 _platformPercentage, uint256 _publisherPercentage, uint256 _tagOwnerPercentage)
    onlyAdmin
    public {
        require(_platformPercentage.add(_publisherPercentage).add(_tagOwnerPercentage) == modulo, "Splitter: incorrect percentages supplied");
        platformPercentage = _platformPercentage;
        publisherPercentage = _publisherPercentage;
        tagOwnerPercentage = _tagOwnerPercentage;
    }

}

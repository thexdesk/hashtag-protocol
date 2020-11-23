pragma solidity 0.6.6;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/GSN/Context.sol";
import "../HashtagLinkSplitter.sol";
import "../HashtagProtocol.sol";

/**
 * @title ERC721HashtagRegistry
 * @notice Contract that allows any ERC721 asset to be tagged by a hashtag within the Hashtag protocol
 * @author Hashtag Protocol
*/
contract ERC721HashtagRegistry is Context {
    using SafeMath for uint256;

    HashtagAccessControls public accessControls;
    HashtagProtocol public hashtagProtocol;
    HashtagLinkSplitter public splitter;

    uint256 public totalTags = 0;

    uint256 public tagFee = 0.01 ether;

    uint256 public modulo = 10000;
    uint256 public mintAndTagDiscount = 0;

    // Used to log that an NFT has been tagged
    event HashtagRegistered(
        address indexed tagger,
        address indexed nftContract,
        address indexed publisher,
        uint256 hashtagId,
        uint256 nftId,
        uint256 platformFee,
        uint256 publisherFee,
        uint256 hashtagFee
    );

    // Stores important information about a tagging event
    struct Tag {
        uint256 hashtagId;
        address nftContract;
        uint256 nftId;
        address tagger;
        uint256 tagstamp;
        address publisher;
    }

    // tag id (will come from the totalTags pointer) -> tag
    mapping(uint256 => Tag) public tagIdToTag;

    // hashtag id -> list of tag ids (can use .length for count)
    mapping(uint256 => uint256[]) public hashtagIdToListOfTagIds;

    // nft contract -> nft id -> list of tag ids (can use .length for count)
    mapping(address => mapping(uint256 => uint256[])) public nftToListOfTagIds;

    // publisher -> list of tag ids tagged through publisher (can use .length for count)
    mapping(address => uint256[]) public publisherToListOfTagIds;

    // tagger -> list of tag ids tagged by tagger (can use .length for count)
    mapping(address => uint256[]) public taggerToListOfTagIds;

    bytes4 private constant _INTERFACE_ID_ERC721 = 0x5b5e139f;

    /**
     * @notice Admin only execution guard
     * @dev When applied to a method, only allows execution when the sender has the admin role
    */
    modifier onlyAdmin() {
        require(accessControls.isAdmin(_msgSender()), "Caller must be admin");
        _;
    }

    constructor (HashtagAccessControls _accessControls, HashtagProtocol _hashtagProtocol, HashtagLinkSplitter _splitter) public {
        accessControls = _accessControls;
        hashtagProtocol = _hashtagProtocol;
        splitter = _splitter;
    }

    /**
     * @notice Combines the action of creating a new hashtag and then tagging an NFT asset with this new tag.
     * @dev Only a whitelisted publisher can execute this with the required fee unless the caller / sender has admin privileges.
     * @param _hashtag string value of the hashtag to be minted
     * @param _nftContract address of nft contract
     * @param _nftId ID of the nft to link from the above nft contract
     * @param _publisher the publisher attributed to the tagging
     * @param _tagger the ethereum account that made the original tagging request
    */
    // FIXME think about how admin can use this for free - is it a problem?
    function mintAndTag(string calldata _hashtag, address _nftContract, uint256 _nftId, address payable _publisher, address _tagger) payable external {
        uint256 mintAndTagFee = calculateMintAndTagFee();
        require(msg.value >= mintAndTagFee, "Mint and tag: You must send the fee");
        require(accessControls.isPublisher(_publisher), "Mint and tag: The publisher must be whitelisted");

        uint256 hashtagId = hashtagProtocol.mint{value: hashtagProtocol.fee()}(_hashtag, _publisher, _tagger);
        tag(hashtagId, _nftContract, _nftId, _publisher, _tagger);
    }

    /**
     * @notice Tags an ERC721 NFT asset by storing a reference between the asset and a hashtag
     * @dev Only a whitelisted publisher can execute this with the required fee unless the caller / sender has admin privileges.
     * @param _hashtagId ID of the hashtag being linked
     * @param _nftContract address of nft contract
     * @param _nftId ID of the nft to link from the above nft contract
     * @param _tagger the ethereum account that made the original tagging request
    */
    function tag(uint256 _hashtagId, address _nftContract, uint256 _nftId, address _publisher, address _tagger) payable public {
        require(hashtagProtocol.exists(_hashtagId), "Tag: The hashtag ID supplied is invalid - non-existent token!");
        require(accessControls.isPublisher(_publisher), "Tag: The publisher must be whitelisted");

        uint256 tagFeeAfterDiscount = calculateTagFeeAfterDiscount();
        require(msg.value >= tagFeeAfterDiscount, "Tag: You must send the fee");

        require(_nftContract != address(0), "Tag: Invalid nft contract address");
        require(_nftContract != address(hashtagProtocol), "Tag: Invalid tag - you are attempting to tag another hashtag");
        require(_isNewTagForNft(_hashtagId, _nftContract, _nftId), "Tag: NFT has already been tagged");

        // Ensure that we are dealing with an ERC721 compliant _nftContract
        try IERC721(_nftContract).supportsInterface(_INTERFACE_ID_ERC721) returns (bool result) {
            require(result == true, "Contract does not implement the ERC721 interface");
        } catch Error(string memory reason) {
            require(false, reason);
        } catch {
            require(false, "Invalid NFT contract");
        }

        // NFT existence checks - revert if NFT does not exist
        try IERC721(_nftContract).ownerOf(_nftId) returns (address owner) {
            require(owner != address(0), "Token does not exist or is owned by the zero address");
        } catch Error(string memory reason) {
            require(false, reason);
        } catch {
            require(false, "Token does not exist");
        }

        // Generate a new tag ID
        totalTags = totalTags.add(1);
        uint256 tagId = totalTags;

        tagIdToTag[tagId] = Tag({
            hashtagId: _hashtagId,
            nftContract: _nftContract,
            nftId: _nftId,
            tagger: _tagger,
            tagstamp: now,
            publisher: _publisher
        });

        // Create the links between the tagging event and the hashtag, nft, publisher and tagger
        hashtagIdToListOfTagIds[_hashtagId].push(tagId);
        nftToListOfTagIds[_nftContract][_nftId].push(tagId);
        publisherToListOfTagIds[_publisher].push(tagId);
        taggerToListOfTagIds[_tagger].push(tagId);

        // Split the tagging fee paid by the tagger to the relevant entities i.e. publisher, owner and platform
        (uint256 platformFee, uint256 publisherFee, uint256 hashtagFee) = splitter.handlePayment{value: tagFeeAfterDiscount}(_hashtagId, _publisher);

        // Log that an NFT has been tagged
        emit HashtagRegistered(_tagger, _nftContract, _publisher, _hashtagId, _nftId, platformFee, publisherFee, hashtagFee);
    }

    /**
     * @notice Retrieves information about a tag event
     * @param _tagId ID of the tagging event of interest
     * @return _hashtagId hashtag ID
     * @return _nftContract NFT contract address
     * @return _nftId NFT ID
     * @return _tagger Address that tagged the NFT asset
     * @return _tagstamp When the tag took place
     * @return _publisher Publisher through which the tag took place
    */
    function getTagInfo(uint256 _tagId) external view returns (
        uint256 _hashtagId,
        address _nftContract,
        uint256 _nftId,
        address _tagger,
        uint256 _tagstamp,
        address _publisher
    ) {
        Tag memory tagInfo = tagIdToTag[_tagId];
        return (
            tagInfo.hashtagId,
            tagInfo.nftContract,
            tagInfo.nftId,
            tagInfo.tagger,
            tagInfo.tagstamp,
            tagInfo.publisher
        );
    }

    /**
     * @notice Gets the IDs of all tag events related to a hashtag
     * @param _hashtagId ID of the hashtag
     * @return uint256[] List of tag IDs relating to tag events
    */
    function getAllTagIdsForAGivenHashtag(uint256 _hashtagId) external view returns (uint256[] memory) {
        return hashtagIdToListOfTagIds[_hashtagId];
    }

    /**
     * @notice Gets the IDs of all tag events related to an NFT
     * @param _nftContract address of the nft contract
     * @param _nftId ID of the nft
     * @return uint256[] List of tag IDs relating to tag events
    */
    function getAllTagIdsForAGivenNft(address _nftContract, uint256 _nftId) external view returns (uint256[] memory) {
        return nftToListOfTagIds[_nftContract][_nftId];
    }

    /**
     * @notice Gets the IDs of all tag events that took place through a publisher
     * @param _publisher Address of the publisher
     * @return uint256[] List of tag IDs relating to tag events
    */
    function getAllTagIdsForAGivenPublisher(address _publisher) external view returns (uint256[] memory) {
        return publisherToListOfTagIds[_publisher];
    }

    /**
     * @notice Gets the IDs of all tag events that were triggered by a given address
     * @param _tagger Address of the tagger
     * @return uint256[] List of tag IDs relating to tag events
    */
    function getAllTagIdsForAGivenTagger(address _tagger) external view returns (uint256[] memory) {
        return taggerToListOfTagIds[_tagger];
    }

    /**
     * @notice Sets the fee required to tag an NFT asset
     * @param _fee Value of the fee in WEI
    */
    function setTagFee(uint256 _fee) onlyAdmin external {
        tagFee = _fee;
    }

    /**
     * @notice Allows the configuration of a discount percentage on the tagging fee
     * @dev The percentage defined must be to 2 decimal places. For example: For a discount of 12.55%, multiply this by 100 to get 1255
     * @param _mintAndTagDiscount Discount percentage
    */
    function setMintAndTagDiscount(uint256 _mintAndTagDiscount) onlyAdmin external {
        mintAndTagDiscount = _mintAndTagDiscount;
    }

    /**
     * @notice Calculates the tagging fee after the discount is applied
     * @return uint256 Tag fee after discount
    */
    function calculateTagFeeAfterDiscount() public view returns (uint256) {
        uint256 tagFeeDiscount = tagFee.div(modulo).mul(mintAndTagDiscount);
        return tagFee.sub(tagFeeDiscount);
    }

    /**
     * @notice Calculates the fee that would be required to create a hashtag and tag an NFT asset in the same transaction
     * @return uint256 Fee for minting and tagging
    */
    function calculateMintAndTagFee() public view returns (uint256) {
        uint256 protocolFee = hashtagProtocol.fee();
        uint256 finalTagFee = calculateTagFeeAfterDiscount();
        return protocolFee.add(finalTagFee);
    }

    /**
     * @notice Admin functionality for updating the commission splitter
     * @param _splitter Address of the splitting contract
    */
    function updateSplitter(HashtagLinkSplitter _splitter) onlyAdmin external {
        splitter = _splitter;
    }

    /**
     * @notice Admin functionality for updating the access controls
     * @param _accessControls Address of the access controls contract
    */
    function updateAccessControls(HashtagAccessControls _accessControls) onlyAdmin external {
        accessControls = _accessControls;
    }

    /**
     * @notice Private method for checking whether a hashtag is already associated with an NFT
     * @param _hashtagId ID of the hashtag
     * @param _nftContract Address of the nft contract
     * @param _nftId ID of the NFT
     * @return bool True if the hashtag has never been associated with the nft, false if there is an existing link
    */
    // FIXME loops are bad...might need another data structure to help with this
    function _isNewTagForNft(uint256 _hashtagId, address _nftContract, uint256 _nftId) private view returns (bool) {
        uint256[] memory tagIds = nftToListOfTagIds[_nftContract][_nftId];

        bool isNewTag = true;
        for(uint256 i = 0; i < tagIds.length; i++) {
            uint256 tagId = tagIds[i];
            Tag memory aTag = tagIdToTag[tagId];

            if (aTag.nftContract == _nftContract && aTag.nftId == _nftId && aTag.hashtagId == _hashtagId) {
                isNewTag = false;
                break;
            }
        }

        return isNewTag;
    }

    // TODO: expose admin drain for excess ETH in the contract
}
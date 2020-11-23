pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./HashtagAccessControls.sol";

/**
 * @title HashtagProtocol contract
 * @notice Core smart contract of the protocol that governs the creation of hashtag tokens
 * @author Hashtag Protocol
*/
contract HashtagProtocol is ERC721, ERC721Burnable {
    using SafeMath for uint256;

    event MintHashtag(
        uint256 indexed tokenId,
        address indexed owner,
        string hashtag,
        string displayHashtag,
        address indexed publisher,
        uint256 platformFee,
        uint256 publisherFee
    );

    // Definition of a Hashtag which bundles associated metadata
    struct Hashtag {
        uint256 created;
        address originalPublisher;
        address creator;
        string value;
        string displayVersion;
    }

    uint256 public tokenPointer = 0;

    // initially free
    uint256 public fee = 0.00 ether;

    mapping(uint256 => Hashtag) public tokenIdToHashtag;
    mapping(string => uint256) public hashtagToTokenId;
    mapping(string => uint256) public displayHashtagToTokenId;

    address payable public platform;
    uint256 public platformPercentage = 9000;
    uint256 modulo = 10000;

    uint256 public hashtagMinStringLength = 3;
    uint256 public hashtagMaxStringLength = 32;

    HashtagAccessControls public accessControls;

    /**
     * @notice Admin only execution guard
     * @dev When applied to a method, only allows execution when the sender has the admin role
    */
    modifier onlyAdmin() {
        require(accessControls.isAdmin(_msgSender()), "Caller must be admin");
        _;
    }

    constructor (HashtagAccessControls _accessControls, address payable _platform)
    public ERC721("Hashtag Protocol", "HASHTAG") {
        accessControls = _accessControls;
        platform = _platform;
    }

    /**
     * @notice Utility method for checking whether a hashtag exists
     * @param _tokenId ID of the hashtag
     * @return bool True if a hashtag exists, false if not
    */
    function exists(uint256 _tokenId) public view returns (bool) {
        return _exists(_tokenId);
    }
    
    /**
     * @notice Admin method for updating the token URI of a hashtag
     * @param _tokenId ID of the hashtag
     * @param _uri New token URI
    */
    function setTokenURI(uint256 _tokenId, string memory _uri) onlyAdmin public {
        _setTokenURI(_tokenId, _uri);
    }

    /**
     * @notice Admin method for updating the base token URI of a hashtag
     * @param _baseURI Base URI for all tokens
    */
    function setBaseURI(string memory _baseURI) onlyAdmin public {
        _setBaseURI(_baseURI);
    }

    function _beforeTokenTransfer(address _from, address _to, uint256 _tokenId) internal virtual override(ERC721) {
        super._beforeTokenTransfer(_from, _to, _tokenId);
    }

    /**
     * @notice Method that a publisher can call to create a hashtag
     * @dev A fee is required unless the caller has an admin role
     * @param _hashtag String version of the hashtag to mint
     * @param _publisher Address of the publisher through which the hashtag is being created
     * @return _tokenId ID of the new hashtag
    */
    function mint(string memory _hashtag, address payable _publisher) payable public returns (uint256 _tokenId) {
        require(accessControls.isPublisher(_publisher), "Mint: The publisher must be whitelisted");
        require(accessControls.isAdmin(_msgSender()) || msg.value >= fee, "Mint: Must send the platform fee");

        _assertHashtagIsValid(_hashtag);

        // generate the new hashtag token id
        tokenPointer = tokenPointer.add(1);
        uint256 tokenId = tokenPointer;

        // create the hashtag
        string memory hashtagKey = _lower(_hashtag);
        tokenIdToHashtag[tokenId] = Hashtag({
            value : hashtagKey,
            displayVersion : _hashtag,
            created : now,
            originalPublisher : _publisher,
            creator : _msgSender()
            });

        // store a reverse lookup and mint the tag
        hashtagToTokenId[hashtagKey] = tokenId;
        displayHashtagToTokenId[_hashtag] = tokenId;

        _mint(platform, tokenId);

        uint256 platformFee;
        uint256 publisherFee;
        if (msg.value > 0) {
            // split fee
            platformFee = msg.value.mul(platformPercentage).div(modulo);
            (bool platformSuccess,) = platform.call{value : platformFee}("");
            require(platformSuccess, "Failed to transfer commission to platform");

            publisherFee = msg.value.sub(platformFee);
            (bool publisherSuccess,) = _publisher.call{value : publisherFee}("");
            require(publisherSuccess, "Failed to transfer commission to publisher");
        }

        // log the minting event
        emit MintHashtag(tokenId, platform, hashtagKey, _hashtag, _publisher, platformFee, publisherFee);

        return tokenId;
    }

    /**
     * @notice Admin functionality for setting the fee required in order to create and mint a hashtag
     * @param _fee Value that the fee will be set to in WEI
    */
    function setFee(uint256 _fee) onlyAdmin external {
        fee = _fee;
    }

    /**
     * @notice Admin functionality for updating the percentage of the minting fee that the platform receives
     * @dev The percentage defined must be to 2 decimal places. For example: For a percentage of 12.55%, multiply this by 100 to get 1255
     * @param _platformPercentage Percentage of the minting fee that the Hashtag Protocol receives
    */
    function setPlatformPercentage(uint256 _platformPercentage) onlyAdmin external {
        platformPercentage = _platformPercentage;
    }

    /**
     * @notice Admin functionality for updating the address that receives the commission on behalf of the platform
     * @param _platform Address that receives platform fees
    */
    function setPlatform(address payable _platform) onlyAdmin external {
        platform = _platform;
    }

    /**
     * @notice Returns the commission addresses related to a token
     * @param _tokenId ID of a hashtag
     * @return _platform Platform commission address
     * @return _owner Address of the owner of the hashtag
    */
    function getPaymentAddresses(uint256 _tokenId) public view returns (
        address payable _platform,
        address payable _owner
    ) {
        return (
        platform,
        payable(ownerOf(_tokenId))
        );
    }

    /**
     * @notice Private method used for validating a hashtag before minting
     * @dev A series of assertions are performed reverting the transaction for any validation violations
     * @param _hashtag Proposed hashtag string
    */
    function _assertHashtagIsValid(string memory _hashtag) private view {
        string memory hashtagKey = _lower(_hashtag);
        require(hashtagToTokenId[hashtagKey] == 0, "Hashtag validation: Hashtag already owned.");

        bytes memory hashtagStringBytes = bytes(_hashtag);
        require(
            hashtagStringBytes.length >= hashtagMinStringLength,
            string(abi.encodePacked(
                "Invalid format: Hashtag must be at least ",
                Strings.toString(hashtagMinStringLength),
                " characters long."
            ))
        );

        require(
            hashtagStringBytes.length <= hashtagMaxStringLength,
            string(abi.encodePacked(
                "Invalid format: Hashtag must not exceed ",
                Strings.toString(hashtagMaxStringLength),
                " characters."
            ))
        );

        uint256 alphabetCharCount = 0;
        for (uint256 i; i < hashtagStringBytes.length; i++) {
            bytes1 char = hashtagStringBytes[i];

            // Generally ensure that the character is alpha numeric
            bool isInvalidCharacter = !(char >= 0x30 && char <= 0x39) && //0-9
                                     !(char >= 0x41 && char <= 0x5A) && //A-Z
                                     !(char >= 0x61 && char <= 0x7A) && //a-z
                                     !(char == 0x2E);

            require(!isInvalidCharacter, "Invalid character found: Hashtag may only contain characters A-Z, a-z, 0-9");

            // Should the char be alphabetic, increment alphabetCharCount
            if ((char >= 0x41 && char <= 0x5A) || (char >= 0x61 && char <= 0x7A)) {
                alphabetCharCount = alphabetCharCount.add(1);
            }
        }

        // Ensure alphabetCharCount is at least 1
        require(alphabetCharCount > 1, "Invalid format: Hashtag must contain at least 1 alphabetic character.");
    }

    /**
     * @notice Converts a string to its lowercase equivalent
     * @param _base String to convert
     * @return string Lowercase version of string supplied
    */
    function _lower(string memory _base) internal pure returns (string memory) {
        bytes memory bStr = bytes(_base);
        bytes memory bLower = new bytes(bStr.length);
        for (uint i = 0; i < bStr.length; i++) {
            // Uppercase character...
            if ((bStr[i] >= 0x41) && (bStr[i] <= 0x5A)) {
                // So we add 32 to make it lowercase
                bLower[i] = bytes1(uint8(bStr[i]) + 32);
            } else {
                bLower[i] = bStr[i];
            }
        }
        return string(bLower);
    }

    // TODO: expose admin drain for excess ETH in the contract
}

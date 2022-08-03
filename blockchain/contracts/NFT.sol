// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../openzepplin/token/ERC721/ERC721.sol";
import "../openzepplin/token/ERC721/extensions/ERC721Enumerable.sol";
import "../openzepplin/token/ERC721/extensions/ERC721URIStorage.sol";
import "../openzepplin/access/Ownable.sol";
import "../openzepplin/utils/Counters.sol";

contract NFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    mapping(string => uint256) public serialNumberToTokenId; //To store NFT associated with the serial number of the product
    // mapping(string => string) public serialNumberToIPFSHash; //As the image will be uploaded before the NFT is minted so we have to store the image for the product in the mapping
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFT", "NFT") {}

    function safeMint(string memory uri, string memory _serialNumber) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        serialNumberToTokenId[_serialNumber] = tokenId;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // function storeImageIPFS(string memory _serialNumber, string memory _IPFSHash) public {
    //     serialNumberToIPFSHash[_serialNumber] = _IPFSHash;
    // }
}

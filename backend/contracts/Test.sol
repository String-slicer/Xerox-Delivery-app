// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Test {
    struct File {
        string cid;
    }

    // Mapping from delivery partner address to file
    mapping(string => File) public files;

    // Add a file for a specific delivery partner
    function addFile(string memory _cid, string memory _deliveryPartner) public {
        files[_deliveryPartner] = File(_cid);
    }

    // Retrieve the file's CID for a delivery partner
    function getFile(string memory _deliveryPartner) public view returns (string memory) {
        require(bytes(files[_deliveryPartner].cid).length != 0, "File does not exist");
        return files[_deliveryPartner].cid;
    }
}

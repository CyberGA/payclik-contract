// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PayClik {
    constructor() {}

    event TransactionStatus(address from, address to, uint256 amount, bool status);
    
    function getBalance() public view returns (uint256) {
        return address(msg.sender).balance;
    }

    function sendEther(address payable _to, uint256 _value) external payable {
        require(address(msg.sender).balance >= _value, "Insufficient balance");
        require(_value > 0, "Amount must be greater than zero");
        require(_to != address(0), "Invalid recipient address");
    
        (bool sent,) = _to.call{value: _value}("");
        emit TransactionStatus(msg.sender, _to, _value, sent);
        require(sent, "Failed to send ether");
    }
}
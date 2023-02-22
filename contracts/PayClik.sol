// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


/// @title A contract to send ether from one address to another
/// @author Gbenga Joshua Etomu
/// @notice You can use this contract to send ether from one address to another address
contract PayClik {
    constructor() {}

    /**
     * @notice This is use to catch the status of the transaction
     * @param from This is the address sending the ether
     * @param to This is the address of the recipient
     * @param amount This is the amount of ether to be sent
     * @param status This is to know whether the transaction was successful or not
     */
    event TransactionStatus(address from, address to, uint256 amount, bool status);
    
    /**
     * @notice This is to get the balance of the address that is connected
     * @dev This might not really be used
     * @dev Returns the balance of the connected address
     * @return uint That is the balance
     */
    function getBalance() public view returns (uint256) {
        return address(msg.sender).balance;
    }

    /**
     * @notice This is the actual function to send the ether
     * @dev external is used to optimize gas
     * @dev Send ether to recipient address if transaction is successful
     * @param _to This is the recipient ethereum address
     * @param _value This is the amount to be sent to the recipient
     */
    function sendEther(address payable _to, uint256 _value) external payable {
        uint256 amt = _value;
        address recipient = _to;
        
        require(address(msg.sender).balance >= amt, "Insufficient balance");
        require(amt > 0, "Amount must be greater than zero");
        require(recipient != address(0), "Invalid recipient address");
    
        (bool sent,) = recipient.call{value: amt}("");
        emit TransactionStatus(msg.sender, recipient, amt, sent);
        require(sent, "Failed to send ether");
    }
}
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Donate {

  struct exists {
     uint sum;
     uint value;
     bool exists;
   }
   
   address private owner;
  
   address[] private addresses;
   
   mapping(address => exists) donated;

   constructor() {
      owner = msg.sender;
   }

   modifier isOwner() {
      require(msg.sender == owner, "Caller is not owner");
      _;
   }

   modifier validateValue() {
      require(msg.value > 0, "Donation must be greater than zero");
      _;
   }
 
   function donate() public payable validateValue {
      updateDonateInfromation(msg.sender, msg.value);  
   }

   function updateDonateInfromation(
      address sender, uint value
   ) private {
      if (donated[sender].exists) {
         donated[sender].value += value;
         donated[sender].sum   += value;
         return;
      }

      donated[sender] = exists(value, value, true);
      addresses.push(sender);
   }

   function withdraw(address to) public isOwner {
      for (uint i = 0; i < addresses.length; i++) {
          payable(to).transfer(donated[addresses[i]].value);
          donated[addresses[i]].value = 0;
      }
   }

   function getAddressSum(address from) public view returns (uint) {
      return donated[from].sum;
   }

   function getAddresses() public view returns(address[] memory) {
      return addresses;
   }
}

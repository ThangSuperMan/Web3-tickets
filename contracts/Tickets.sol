// SPDX-Liences-Identifier: MIT;
pragma solidity >=0.4.22 <0.7.0;

contract Tickets {
  uint256 constant TOTAL_PRICE = 10;
  address public owner = msg.sender;

  struct Ticket {
    uint256 id;
    uint256 price;
    address owner;
  }

  Ticket[TOTAL_PRICE] public tickets;

  constructor() public {
    owner = msg.sender;

    for (uint256 i = 0; i < tickets.length; i++) {
      tickets[i].id = i;
      tickets[i].price = 1e17; // 0.1ETH
      tickets[i].owner = address(0x0);
    }
  }

  function buyTicket(uint256 _index) external payable {
    require(_index < TOTAL_PRICE && _index >= 0);
    require(tickets[_index].owner == address(0x0));
    require(msg.value >= tickets[_index].price);
    tickets[_index].owner = msg.sender;
  }

}

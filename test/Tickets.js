const Tickets = artifacts.require('Tickets.sol')
const assert = require('assert')

contract('Tickets', (accounts) => {
  const TICKET_ID = 0;
  const buyer = accounts[1];

  it('Should allow a user to buy a ticket', async () => {
    const instance = await Tickets.deployed();
    const originalTicket = await instance.tickets(TICKET_ID);
    const updatedTicket = await instance.tickets(TICKET_ID);

    await instance.buyTicket(TICKET_ID, {
      from: buyer,
      value: originalTicket.price
    })

    assert.equal(
      updatedTicket.owner,
      buyer,
      'The buyer should now own this ticket'
    );

  })
})

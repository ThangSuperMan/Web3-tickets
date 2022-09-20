import Web3 from 'web3';
import TicketsContractBuild from '../build/contracts/Tickets.json'
import TicketImage from './images/ticket.jpeg'

const accountEl = document.getElementById('account')
const ticketsEl = document.getElementById('tickets')

const TOTAL_TICKETS = 10;
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'
let selectedAccount;
let tickets = [];


const createElementFromString = (string) => {
  const div = document.createElement('div');
  div.innerHTML = string.trim();
  return div.firstChild;
}

const buyTicket = async (ticket) => {
  console.log("buyTicket")
  const provider = window.ethereum;
  const web3 = new Web3(provider);
  const networkAddress = TicketsContractBuild.networks['5777'].address;
  const ticketsContract = new web3.eth.Contract(
    TicketsContractBuild.abi,
    networkAddress,
  )

  const account = selectedAccount;
  await ticketsContract.methods.buyTicket(ticket.id).send({
    from: account,
    value: ticket.price,
  })

  window.location.reload()
}

const refreshTickets = async () => {
  console.log('refreshTickets')
  const provider = window.ethereum;
  const web3 = new Web3(provider);
  const networkAddress = TicketsContractBuild.networks['5777'].address;
  const ticketsContract = new web3.eth.Contract(
    TicketsContractBuild.abi,
    networkAddress,
  )

  for (let index = 0; index < TOTAL_TICKETS; index++) {
    const ticket = await ticketsContract.methods.tickets(index).call();
    tickets.push(ticket)

    if (ticket.owner === EMPTY_ADDRESS) {
      const ticketEl = createElementFromString(`
        <div class="ticket">
          <img class="ticket-img" src="${TicketImage}" />
          <p>id ticket: ${ticket.id}</p>
          <p class="ticket-price">${ticket.price} wei</p>
          <button class="btn-ticket button t is-link">Buy</button>
        </div>
        `)
      ticketsEl.appendChild(ticketEl)

      const btnTickets = ticketsEl.querySelectorAll(".btn-ticket");
      for (let i = 0; i < btnTickets.length; i++) {
        const btnTicket = btnTickets[i];
        btnTicket.onclick = buyTicket.bind(null, ticket)
      }

    }
  }
}

const main = async () => {
  // waitForAccount()
  const provider = window.ethereum;

  if (typeof provider !== 'undefined') {
    console.log('MetaMask is installed!');
    provider.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        selectedAccount = accounts[0];
        accountEl.innerText = selectedAccount;
        console.log(`selectedAccount: ${selectedAccount}`)

        window.ethereum.on('accountsChanged', (accounts) => {
          selectedAccount = accounts[0];
          console.log(`selectedAccount: ${selectedAccount}`)
          console.log(`Selected account changed to ${selectedAccount}`);
          window.location.reload();
        })
      })
      .catch((err) => {
        console.error(err);
      })


    refreshTickets()
  }
}

main()



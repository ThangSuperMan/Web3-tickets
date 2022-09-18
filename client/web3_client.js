import Web3 from 'web3';
import TicketsContractBuild from '../build/contracts/Tickets.json'

let selectedAccount;
const TOTAL_TICKETS = 10;
const tickets = [];

export const init = async () => {
  console.log('init')
  const provider = window.ethereum;

  if (typeof provider !== 'undefined') {
    console.log('MetaMask is installed!');
    provider.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        selectedAccount = accounts[0];
        console.log(`selectedAccount: ${selectedAccount}`)
        // accountEl.textContent = account;
      })
      .catch((err) => {
        console.log(err);
      })

    window.ethereum.on('accountsChanged', (accounts) => {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    })

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();
    const networkAddress = TicketsContractBuild.networks['5777'].address;
    console.log(networkId)
    console.log(networkAddress)

    const ticketsContract = new web3.eth.Contract(
      TicketsContractBuild.abi,
      networkAddress,
    )

    for (let index = 0; index < TOTAL_TICKETS; index++) {
      const ticket = await ticketsContract.methods.tickets(index).call();
      tickets.push(ticket)
      console.log('ticket')
      console.log(ticket)
    }


    console.log('TicketsContract')
    console.log(ticketsContract.methods.tickets(1))
  }

  return selectedAccount, tickets;
}

export const ticketsToken = () => {
  console.log('ticketsToken')
}


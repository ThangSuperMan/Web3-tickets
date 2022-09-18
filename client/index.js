import Web3 from 'web3';
import { init, ticketsToken } from './web3_client'
import configuration from '../build/contracts/Tickets.json'

const accountEl = document.getElementById('account')
const ticketsEl = document.getElementById('tickets')

const TOTAL_TICKETS = 10;
let selectedAccount;
let tickets = [];

const main = async () => {
  selectedAccount, tickets = await init();
  console.log(selectedAccount)
  console.log(tickets)
  accountEl.innerText = selectedAccount;

}

main()
ticketsToken()





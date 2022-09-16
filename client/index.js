import Web3 from 'web3';
import configuration from '../build/contracts/Tickets.json'

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}

const accountEl = document.getElementById('account')
const ticketsEl = document.getElementById('tickets')
const connectToMetamaskBtn = document.getElementById('connect-account')

const contractAbi = configuration.abi;
const contractAddress = configuration.networks['5777'].address;
console.log(contractAbi)
console.log(contractAddress)

const web3 = new Web3(
  Web3.givenProvider || 'http://127.0.0.1:7545'
)

const main = async () => {
  const accounts = await web3.eth.requestAccounts()
  accountEl.innerText = accounts;
  const contract = await new web3.eth.Contract(contractAbi, contractAddress)
  console.log(contract)
}

const handleConnectToWallet = async () => {
  console.log("handleConnectToWallet")
  const accounts = await ethereum.request({ method: "eth_requestAccounts" })
  if (accountEl) {
    accountEl.innerText = accounts;
  }
}

connectToMetamaskBtn.addEventListener('click', handleConnectToWallet)

main()


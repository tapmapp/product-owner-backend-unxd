let fs = require("fs");
let Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

let source = fs.readFileSync("../abis/LuxOwn.json");
let contracts = JSON.parse(source)["contracts"];

console.log(contracts);

// ABI description as JSON structure
let abi = JSON.parse(contracts.LuxOwn.abi);

// Smart contract EVM bytecode as hex
let code = '0x' + contracts.LuxOwn.bin;

// Create Contract proxy class
let LuxOwn = web3.eth.contract(abi);

// Unlock the coinbase account to make transactions out of it
console.log("Unlocking coinbase account");

try {
    web3.personal.unlockAccount(web3.eth.coinbase, process.env.ACCOUNT_PASS, 1000);
} catch (e) {
    console.log(e);
}

console.log("Deploying the contract");
let contract = LuxOwn.new({ from: web3.eth.coinbase, gas: 1000000, data: code });

// Transaction has entered to geth memory pool
console.log("Your contract is being deployed in transaction at http://testnet.etherscan.io/tx/" + contract.transactionHash);

// http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// We need to wait until any miner has included the transaction
// in a block to get the address of the contract
async function waitBlock() {
    while (true) {
        let receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
        if (receipt && receipt.contractAddress) {
            console.log("Your contract has been deployed at http://testnet.etherscan.io/address/" + receipt.contractAddress);
            console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");
            break;
        }
        console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
        await sleep(4000);
    }
}

waitBlock();
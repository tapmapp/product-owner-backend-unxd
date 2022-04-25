let fs = require("fs");
let Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(process.env.APPLICATION_PORT));

export async function deployNFT(address) {

    let source = fs.readFileSync("../abis/LuxOwn.json");
    let contracts = JSON.parse(source)["contracts"];
    let abi = JSON.parse(contracts.LuxOwn.abi);

    console.log(contracts);

    // Smart contract EVM bytecode as hex
    let code = '0x' + contracts.LuxOwn.bin;

    // Create Contract proxy class
    let LuxOwn = web3.eth.contract(abi);

    // Unlock the coinbase account to make transactions out of it
    console.log("Unlocking account");

    try {
        web3.personal.unlockAccount(address, process.env.ACCOUNT_PASS, 1000);
    } catch (e) {
        console.log(e);
    }

    console.log("Deploying the contract");
    let contract = LuxOwn.new({ from: address, gas: 1000000, data: code });

    // Transaction has entered to geth memory pool
    console.log("Your contract is being deployed in transaction at http://testnet.etherscan.io/tx/" + contract.transactionHash);

    waitBlock(contract);

}

async function waitBlock(contract) {
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// import { ethers } from 'ethers';


// let source = fs.readFileSync("../abis/LuxOwn.json");
// let contracts = JSON.parse(source)["contracts"];
// let abi = JSON.parse(contracts.LuxOwn.abi);


// // Connect to the network
// let provider = ethers.getDefaultProvider();

// // The address from the above deployment example
// let contractAddress = "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E";

// // We connect to the Contract using a Provider, so we will only
// // have read-only access to the Contract
// let contract = new ethers.Contract(contractAddress, abi, provider);

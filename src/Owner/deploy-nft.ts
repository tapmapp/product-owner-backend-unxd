import * as fs from 'fs';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';

export async function deployNFT(productBrand, productReference, productId): Promise<TransactionReceipt> {

    let source = fs.readFileSync(`${__dirname}/../public/abis/LuxOwnFactory.json`, 'utf-8');

    let contracts = JSON.parse(source);

    const provider = new Web3(process.env._3_PROVIDER_URL);
    const LXOContract = new provider.eth.Contract(contracts.abi, process.env.LXO_FACTORY_ADDRESS);

    provider.eth.accounts.wallet.add(process.env.ACCOUNT_PASS);

    const tx = LXOContract.methods.createNew(parseInt(productBrand), parseInt(productReference), parseInt(productId));
    const gas = await tx.estimateGas({ from: process.env.LXO_ACCOUNT });

    const gasPrice = await provider.eth.getGasPrice();
    const data = tx.encodeABI();

    const txData = {
        from: process.env.LXO_ACCOUNT,
        to: LXOContract.options.address,
        data: data,
        gas,
        gasPrice,
    };

    try {
        const receipt = await provider.eth.sendTransaction(txData);
        provider.eth.accounts.wallet.clear();
        console.log('TRANSACTION SENT!');
        return receipt;
    } catch (error) {
        console.log('THERE WAS AN ERROR SENDING YOUR TRANSACTION!')
        console.log(error);
    }

}
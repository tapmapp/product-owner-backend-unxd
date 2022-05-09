import * as fs from 'fs';
import Web3 from 'web3';

// PRODUCT REPOSITORY
import { ProductRepository } from 'src/Product/product.repository';

// MODELS
import { Product } from 'src/Product/product.model';

// INTERFACES
import { TransactionReceipt } from 'web3-core';

export async function deployNFTContract(productRepository: ProductRepository, product: Product): Promise<void> {

    const provider = new Web3(process.env._3_PROVIDER_URL);

    let source = fs.readFileSync(`${__dirname}/../static/abis/luxown.json`, 'utf-8');
    let contracts = JSON.parse(source);

    const abi = contracts.output.contracts['contracts/factoryV2.sol'].LuxOwn.abi;

    const ProductContract = new provider.eth.Contract(abi);

    provider.eth.accounts.wallet.add(process.env.ACCOUNT_PASS);

    const bytecode = contracts.output.contracts['contracts/factoryV2.sol'].LuxOwn.evm.bytecode.object;

    ProductContract.deploy({
        data: '0x' + bytecode,
        arguments: [product.productReference],
    }).send({
        from: process.env.LXO_ACCOUNT,
        gas: 3000000,
    }).on('error', (error: Error) => {
        console.log(error);
    }).on('transactionHash', (transactionHash: string) => {
        console.log(transactionHash)
        productRepository.updateProduct({ nftTransactionHash: transactionHash }, product.id);
        provider.eth.accounts.wallet.clear();
    }).on('receipt', (receipt: TransactionReceipt) => {
        console.log(receipt.contractAddress);
        productRepository.updateProduct({ nftContractAddress: receipt.contractAddress }, product.id);
    });

}

export async function generateNFT(productRepository: ProductRepository, product: Product): Promise<void> {

    let source = fs.readFileSync(`${__dirname}/../static/abis/luxown.json`, 'utf-8');

    let contracts = JSON.parse(source);

    const provider = new Web3(process.env._3_PROVIDER_URL);
    const LXOContract = new provider.eth.Contract(contracts.abi, process.env.LXO_FACTORY_ADDRESS);

    provider.eth.accounts.wallet.add(process.env.ACCOUNT_PASS);

    const tx = LXOContract.methods.createNew(product.productReference);
    const gas = await tx.estimateGas({ from: process.env.LXO_ACCOUNT });

    const gasPrice = await provider.eth.getGasPrice();
    const data = tx.encodeABI();

    const txData = {
        from: process.env.LXO_ACCOUNT,
        to: process.env.LXO_FACTORY_ADDRESS,
        data: data,
        gas,
        gasPrice,
    };

    try {
        provider.eth.sendTransaction(txData).on('transactionHash', async (transactionHash: string) => {
            console.log('TRANSACTION SENT!');
            provider.eth.accounts.wallet.clear();
            await productRepository.updateProduct({ nftTransactionHash: transactionHash }, product.id);
        }).on('receipt', async (receipt: TransactionReceipt) => {
            console.log('TRANSACTION COMPLETED!');
            console.log(receipt);
            await productRepository.updateProduct({ nftContractAddress: receipt.logs[0].address }, product.id);
        });
    } catch (error) {
        console.log('THERE WAS AN ERROR SENDING YOUR TRANSACTION!')
        console.log(error);
    }

}

const checkTransaction = (provider, txHash) => {
    provider.eth.getTransaction(txHash).then(console.log);
}

export async function mintItem(address: string, mintData: string): Promise<TransactionReceipt> {

    let source = fs.readFileSync(`${__dirname}/../public/abis/LuxOwnFactory.json`, 'utf-8');

    let contracts = JSON.parse(source);

    const provider = new Web3(process.env._3_PROVIDER_URL);
    const LXOContract = new provider.eth.Contract(contracts.abi, process.env.LXO_FACTORY_ADDRESS);

    provider.eth.accounts.wallet.add(process.env.ACCOUNT_PASS);

    const tx = LXOContract.methods.createNew(address, mintData);
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
        const receipt = await provider.eth.sendTransaction(txData).on('transactionHash', async (transactionHash: string) => {
            console.log('TRANSACTION SENT!');
            provider.eth.accounts.wallet.clear();
            //await productRepository.updateProduct({ nftTransactionHash: transactionHash }, product.id);
        }).on('receipt', async (receipt: TransactionReceipt) => {
            console.log('TRANSACTION COMPLETED!');
            console.log(receipt);
            //await productRepository.updateProduct({ nftContractAddress: receipt.logs[0].address }, product.id);
        });
        return receipt;
    } catch (error) {
        console.log('THERE WAS AN ERROR SENDING YOUR TRANSACTION!')
        console.log(error);
    }

}
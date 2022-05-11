import * as fs from 'fs';
import Web3 from 'web3';

// WEB3 PROVIDER
import { provider } from '../provider';

// PRODUCT REPOSITORY
import { ProductRepository } from 'src/Product/product.repository';

// MODELS
import { Product } from 'src/Product/product.model';

// INTERFACES
import { TransactionReceipt } from 'web3-core';

export async function deployNFTContract(productRepository: ProductRepository, product: Product): Promise<void> {

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

    let source = fs.readFileSync(`${__dirname}${process.env.LXO_FACTORY_ABI}`, 'utf-8');

    let contracts = JSON.parse(source);

    const abi = contracts.output.contracts['contracts/Factory.sol'].LuxOwnFactory.abi;

    const LXOContract = new provider.eth.Contract(abi, process.env.LXO_FACTORY_ADDRESS);

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

    provider.eth.sendTransaction(txData).on('transactionHash', async (transactionHash: string) => {
        console.log('TRANSACTION SENT!');
        provider.eth.accounts.wallet.clear();
        await productRepository.updateProduct({ nftTransactionHash: transactionHash }, product.id);
    }).on('receipt', async (receipt: TransactionReceipt) => {
        console.log('TRANSACTION COMPLETED!');
        await productRepository.updateProduct({ nftContractAddress: receipt.logs[0].address }, product.id);
    }).on('error', (error: Error) => {
        console.log('THERE WAS AN ERROR SENDING YOUR TRANSACTION!');
        console.log(error);
    });

}

export async function mintProductItem(productRepository: ProductRepository, ownerAddress: string, productItemId: string, productIdentifier: string, mintData: string): Promise<void> {

    let source = fs.readFileSync(`${__dirname}${process.env.LXO_FACTORY_ABI}`, 'utf-8');

    let contracts = JSON.parse(source);

    const abi = contracts.output.contracts['contracts/Owner.sol'].LuxOwn.abi;

    const LXOContract = new provider.eth.Contract(abi, process.env.LXO_FACTORY_ADDRESS);

    provider.eth.accounts.wallet.add(process.env.ACCOUNT_PASS);

    const tx = LXOContract.methods.createItem(ownerAddress, productIdentifier, mintData);
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

    provider.eth.sendTransaction(txData).on('transactionHash', async (transactionHash: string) => {

        console.log('MINT ITEM TRANSACTION SENT!');
        provider.eth.accounts.wallet.clear();
        await productRepository.updateProductItem({ transactionHash }, productItemId);

    }).on('receipt', async (receipt: TransactionReceipt) => {

        console.log('MINT ITEM TRANSACTION COMPLETED!');
        console.log(receipt);
        // await productRepository.updateProductItem({ transactionHash }, productItemId);

    }).on('error', (error: Error) => {
        console.log('THERE WAS AN ERROR SENDING YOUR TRANSACTION!');
        console.log(error);
    });

}
import { Injectable } from '@nestjs/common';

// MODELS
import { Product } from './product.model';

// SERVICES
import { ProductRepository } from './product.repository';

// INTERFACES
import { TransactionReceipt } from 'web3-core';

// NFT
import { generateNFT, mintItem } from 'src/utils/deploy-nft';

@Injectable()
export class ProductService {

    constructor(private productRepository: ProductRepository) { }

    async getProduct(productReference: string): Promise<Product> {
        return await this.productRepository.getProduct(productReference);
    }

    async getProducts(): Promise<Product[]> {
        return await this.productRepository.getProducts();
    }

    async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productIdentifiers: string[]): Promise<Product> {
        const addedProduct = await this.productRepository.addProduct(productImg, productName, brandId, productReference, productIdentifiers);
        await generateNFT(this.productRepository, addedProduct);
        return await this.productRepository.getProduct(addedProduct.productReference);
    }

    async mintNFT(address: string, mintData: string): Promise<TransactionReceipt> {
        return await mintItem(address, mintData);
    }

    async removeProduct(productReference: string): Promise<void> {
        await this.productRepository.removeProduct(productReference);
    }

}

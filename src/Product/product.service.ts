import { Injectable } from '@nestjs/common';

// MODELS
import { Product, ProductItem } from './product.model';

// SERVICES
import { ProductRepository } from './product.repository';

// INTERFACES
import { TransactionReceipt } from 'web3-core';

// NFT
import { generateNFT, getNFT, mintProductItem } from 'src/utils/deploy-nft';

@Injectable()
export class ProductService {

    constructor(private productRepository: ProductRepository) { }

    async getProduct(productReference: string): Promise<Product> {
        return await this.productRepository.getProduct(productReference);
    }

    async getProducts(): Promise<Product[]> {
        return await this.productRepository.getProducts();
    }

    async getNFT(contractAddress: string, tokenId: string): Promise<any> {
        await getNFT(contractAddress, tokenId);
    }

    async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productIdentifiers: ProductItem[]): Promise<Product> {
        const productIdentifiersIds = productIdentifiers.map(productIdentifier => productIdentifier.id);
        const addedProduct = await this.productRepository.addProduct(productImg, productName, brandId, productReference, productIdentifiersIds);
        await generateNFT(this.productRepository, addedProduct);
        return await this.productRepository.getProduct(addedProduct.productReference);
    }

    async mintProductItem(address: string, tokenUri: string): Promise<TransactionReceipt> {
        return await mintProductItem(address, tokenUri);
    }

    async removeProduct(productReference: string): Promise<void> {
        await this.productRepository.removeProduct(productReference);
    }

}

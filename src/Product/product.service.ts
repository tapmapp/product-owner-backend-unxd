import { Injectable } from '@nestjs/common';

// MODELS
import { Product } from './product.model';

// SERVICES
import { ProductRepository } from './product.repository';

// NFT
import { deployNFTContract } from 'src/utils/deploy-nft';

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
        deployNFTContract(this.productRepository, addedProduct);
        return addedProduct;
    }

    async removeProduct(productReference: string): Promise<void> {
        await this.productRepository.removeProduct(productReference);
    }

}

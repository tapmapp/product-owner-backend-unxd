import { Injectable } from '@nestjs/common';


// NFT
import { deployNFT } from '../Owner/deploy-nft';

// MODELS
import { Product } from './product.model';

// SERVICES
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {

    constructor(private productsRepository: ProductRepository) { }

    async getProduct(productReference: string): Promise<Product> {
        return await this.productsRepository.getProduct(productReference);
    }

    async getProducts(): Promise<Product[]> {
        return await this.productsRepository.getProducts();
    }

    async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productIdentifiers: string[]): Promise<Product> {
        return await this.productsRepository.addProduct(productImg, productName, brandId, productReference, productIdentifiers);
    }

    async removeProduct(productReference: string): Promise<void> {
        await this.productsRepository.removeProduct(productReference);
    }

}

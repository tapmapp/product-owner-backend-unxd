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

    async getProduct(productId: string): Promise<Product> {
        return await this.productsRepository.getProduct(productId);
    }

    async getProducts(): Promise<Product[]> {
        return await this.productsRepository.getProducts();
    }

    async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productId: string): Promise<Product> {
        return await this.productsRepository.addProduct(productImg, productName, brandId, productReference, productId);
    }

    async removeProduct(productId: string): Promise<void> {
        await this.productsRepository.removeProduct(productId);
    }

}

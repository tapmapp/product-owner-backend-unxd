import { Injectable } from '@nestjs/common';

// NFT
import { deployNFT } from './deploy-nft';

// MODELS
import { Product } from './products.model';

// SERVICES
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {

    constructor(private productsRepository: ProductsRepository) { }

    async getProduct(productId: string): Promise<Product> {
        return await this.productsRepository.getProduct(productId);
    }

    async getProducts(): Promise<Product[]> {
        return await this.productsRepository.getProducts();
    }

    async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productId: string): Promise<Product> {
        // deployNFT(brandId, productReference, productId);


        
        return await this.productsRepository.addProduct(productImg, productName, brandId, productReference, productId);
    }

    async removeProduct(productId: string): Promise<void> {
        await this.productsRepository.removeProduct(productId);
    }

}

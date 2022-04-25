import { Injectable } from '@nestjs/common';

// NFT
import { createNewNft } from './deploy-nft';

// MODELS
import { Product } from './products.model';

// SERVICES
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {

    constructor(private productsRepository: ProductsRepository) { }

    async getProduct(productId: string): Promise<Product> {
        const product = await this.productsRepository.getProduct(productId);
        return product;
    }

    async getProducts(): Promise<Product[]> {
        const products = await this.productsRepository.getProducts();
        return products;
    }

    async addProduct(productBrand: string, productReference: string, productId: string): Promise<Product> {
        const product = await this.productsRepository.addProduct(productBrand, productReference, productId);
        createNewNft(productBrand, productReference, productId);
        return product
    }

    async removeProduct(productId: string): Promise<void> {
        await this.productsRepository.removeProduct(productId);
    }

}

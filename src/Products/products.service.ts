import { Injectable } from '@nestjs/common';

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

    async addProduct(id: string, name: string, img: string, ref: string): Promise<void> {
        const products = await this.productsRepository.addProduct(id, name, img, ref);
    }

}

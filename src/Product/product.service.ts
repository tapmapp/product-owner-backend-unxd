import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

// MODELS
import { Product, ProductItem, ProductItemInput } from './product.model';

// SERVICES
import { ProductRepository } from './product.repository';

// NFT
import { generateNFT, mintProductItem } from 'src/utils/deploy-nft';

@Injectable()
export class ProductService {

    constructor(private productRepository: ProductRepository) { }

    async getProduct(productReference: string): Promise<Product> {
        return await this.productRepository.getProduct(productReference);
    }

    async getProductById(productId: string): Promise<Product> {
        return await this.productRepository.getProductById(productId);
    }

    async getProductItem(productIdentifier: string): Promise<ProductItem> {
        return await this.productRepository.getProductItem(productIdentifier);
    }

    async getProducts(): Promise<Product[]> {
        return await this.productRepository.getProducts();
    }

    async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productIdentifiers: ProductItemInput[]): Promise<Product> {

        const productItemsIds = productIdentifiers.map(productIdentifier => crypto.randomUUID());
        const addedProduct = await this.productRepository.addProduct(productImg, productName, brandId, productReference, productItemsIds);

        const productItemsWithIDs = productIdentifiers.map((productIdentifier: ProductItemInput, i: number) => {
            return {
                id: productItemsIds[i],
                productIdentifier: productIdentifier.productIdentifier,
                productId: addedProduct.id
            }
        });

        await this.productRepository.addProductItems(productItemsWithIDs);
        await generateNFT(this.productRepository, addedProduct);

        return await this.productRepository.getProduct(addedProduct.productReference);

    }

    async mintProductItem(ownerAddress: string, productId: string, productRef: string, productIdentifier: string, tokenUri: string): Promise<void> {
        await mintProductItem(this.productRepository, ownerAddress, productId, productRef, productIdentifier, tokenUri);
    }

    async removeProduct(productReference: string): Promise<void> {
        await this.productRepository.removeProduct(productReference);
    }

}

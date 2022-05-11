import { Injectable } from '@nestjs/common';

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

    async getProductItem(productIdentifier: string): Promise<ProductItem> {
        return await this.productRepository.getProductItem(productIdentifier);
    }

    async getProducts(): Promise<Product[]> {
        return await this.productRepository.getProducts();
    }

    async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productIdentifiers: ProductItemInput[]): Promise<Product> {

        const productItemsIdentifiers = productIdentifiers.map(productIdentifier => productIdentifier.productIdentifier);
        const addedProduct = await this.productRepository.addProduct(productImg, productName, brandId, productReference, productItemsIdentifiers);

        await this.productRepository.addProductItems(productIdentifiers);
        await generateNFT(this.productRepository, addedProduct);

        return await this.productRepository.getProduct(addedProduct.productReference);

    }

    async mintProductItem(ownerAddress: string, productItemId: string, productIdentifier: string, tokenUri: string): Promise<void> {
        await mintProductItem(this.productRepository, ownerAddress, productItemId, productIdentifier, tokenUri);
    }

    async removeProduct(productReference: string): Promise<void> {
        await this.productRepository.removeProduct(productReference);
    }

}

import { Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';

// MODELS
import { Product, ProductItem } from './product.model';

// SERVICES
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {

    constructor(private productService: ProductService) { }

    @Query(() => Product)
    async getProduct(
        @Args('productReference') productReference: string
    ): Promise<Product> {
        const product = await this.productService.getProduct(productReference);
        return product;
    }

    @Query(() => Boolean)
    async getNFT(
        @Args('contractAddress') contractAddress: string,
        @Args('tokenId') tokenId: string
    ): Promise<any> {
        const nft = await this.productService.getNFT(contractAddress, tokenId);
        console.log(nft);
        return true;
        // 0x4419bdd879a6cd31672d3a4a490eb593147c01e8?a=0
    }

    @Query(() => [Product])
    async getProducts(): Promise<Product[]> {
        const products = await this.productService.getProducts();
        return products;
    }

    @Mutation(() => Product)
    async addProduct(
        @Args({ name: 'productImg', type: () => String }) productImg: string,
        @Args({ name: 'productName', type: () => String }) productName: string,
        @Args({ name: 'brandId', type: () => String }) brandId: string,
        @Args({ name: 'productReference', type: () => String }) productReference: string,
        @Args({ name: 'productIdentifiers', type: () => [ProductItem] }) productIdentifiers: ProductItem[],
    ) {
        const product = this.productService.addProduct(productImg, productName, brandId, productReference, productIdentifiers);
        return product;
    }

    @Mutation(() => Boolean)
    async mintProductItem(
        @Args({ name: 'ownerAddress', type: () => String }) ownerAddress: string,
        @Args({ name: 'tokenUri', type: () => String }) tokenUri: string,
    ): Promise<Boolean> {
        const transactionReceipt = await this.productService.mintProductItem(ownerAddress, tokenUri);
        console.log(transactionReceipt);
        return true;
    }

    @Mutation(() => Boolean)
    async removeProduct(
        @Args('productReference') productReference: string
    ): Promise<boolean> {
        await this.productService.removeProduct(productReference);
        return true;
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

}

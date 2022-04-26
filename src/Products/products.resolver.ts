import { Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';

// MODELS
import { Product } from './products.model';

// SERVICES
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {

    constructor(private productsService: ProductsService) { }

    @Query(() => Product)
    async getProduct(
        @Args('productId') productId: string
    ): Promise<Product> {
        const product = await this.productsService.getProduct(productId);
        return product;
    }

    @Query(() => [Product])
    async getProducts(): Promise<Product[]> {
        const products = await this.productsService.getProducts();
        return products;
    }

    @Mutation(() => Product)
    async addProduct(
        @Args({ name: 'productImg', type: () => String }) productImg: string,
        @Args({ name: 'productName', type: () => String }) productName: string,
        @Args({ name: 'brandId', type: () => String }) brandId: string,
        @Args({ name: 'productReference', type: () => String }) productReference: string,
        @Args({ name: 'productId', type: () => String }) productId: string,
    ) {
        const product = this.productsService.addProduct(productImg, productName, brandId, productReference, productId);
        return product;
    }

    @Mutation(() => Boolean)
    async removeProduct(
        @Args('productId') productId: string
    ): Promise<boolean> {
        await this.productsService.removeProduct(productId);
        return true;
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

}

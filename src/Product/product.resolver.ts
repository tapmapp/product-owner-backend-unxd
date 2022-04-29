import { Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';


// MODELS
import { Product } from './product.model';

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
        @Args({ name: 'productIdentifiers', type: () => [String] }) productIdentifiers: string[],
    ) {

        const product = this.productService.addProduct(productImg, productName, brandId, productReference, productIdentifiers);
        return product;
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

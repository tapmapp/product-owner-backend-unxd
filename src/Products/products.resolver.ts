import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

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
        @Args({ name: 'identifier', type: () => String }) identifier: string,
        @Args({ name: 'name', type: () => String }) name: string,
        @Args({ name: 'description', type: () => String }) description: string,
        @Args({ name: 'img', type: () => String }) img: string,
        @Args({ name: 'ref', type: () => String }) ref: string,
    ) {
        const product = this.productsService.addProduct(identifier, name, description, img, ref);
        return product;
    }

    @Mutation(() => Boolean)
    async removeProduct(
        @Args('productId') productId: string
    ): Promise<boolean> {
        await this.productsService.removeProduct(productId);
        return true;
    }

}

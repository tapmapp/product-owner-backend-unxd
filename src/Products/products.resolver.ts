import { Args, Query, Resolver } from '@nestjs/graphql';

// MODELS
import { Product } from './products.model';

// SERVICES
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {

    constructor(private productsService: ProductsService) { }

    @Query(() => Product)
    async getProduct(
        @Args('productId', { type: () => String }) productId: string
    ): Promise<Product> {

        const product = await this.productsService.getProduct(productId);
        return product;
    }
}

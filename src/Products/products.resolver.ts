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
        @Args('productId', { type: () => String }) productId: string
    ): Promise<Product> {

        const product = await this.productsService.getProduct(productId);
        return product;
    }


    @Mutation(() => Product)
    async reportAddress(
        @Args({ name: 'id', type: () => String }) id: string,
        @Args({ name: 'name', type: () => String }) name: string,
        @Args({ name: 'img', type: () => String }) img: string,
        @Args({ name: 'ref', type: () => String }) ref: string,
    ) {
        return this.productsService.addProduct(id, name, img, ref);
    }

}

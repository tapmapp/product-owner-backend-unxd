import { Args, Query, Resolver } from '@nestjs/graphql';

// MODELS
import { Owner } from './owner.model';

// SERVICES
import { OwnerService } from './owner.service';

@Resolver()
export class OwnerResolver {

    constructor(private ownerService: OwnerService) { }

    @Query(() => Owner)
    async mintNFT(
        @Args({ name: 'brandId', type: () => String }) brandId: string,
        @Args({ name: 'productReference', type: () => String }) productReference: string,
        @Args({ name: 'productId', type: () => String }) productId: string,
    ): Promise<Owner> {
        const transactionReceipt = await this.ownerService.mintNFT(brandId, productReference, productId);
        const owner = this.ownerService.addOwner(brandId, productReference, productId, transactionReceipt.transactionHash);
        return owner;
    }

}

import { Args, Mutation, Resolver } from '@nestjs/graphql';

// MODELS
import { Owner } from './owner.model';

// SERVICES
import { OwnerService } from './owner.service';

@Resolver()
export class OwnerResolver {

    constructor(private ownerService: OwnerService) { }

    @Mutation(() => Owner)
    async mintNFT(
        @Args({ name: 'brandId', type: () => String }) brandId: string,
        @Args({ name: 'productReference', type: () => String }) productReference: string,
        @Args({ name: 'productIdentifier', type: () => String }) productIdentifier: string,
    ): Promise<Owner> {
        const transactionReceipt = await this.ownerService.mintNFT(brandId, productReference, productIdentifier);
        const owner = this.ownerService.addOwner(brandId, productReference, productIdentifier, transactionReceipt.transactionHash);
        return owner;
    }

}

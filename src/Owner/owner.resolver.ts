import { Args, Mutation, Resolver } from '@nestjs/graphql';

// MODELS
import { Owner } from './owner.model';

// SERVICES
import { OwnerService } from './owner.service';

@Resolver()
export class OwnerResolver {

    constructor(private ownerService: OwnerService) { }

}

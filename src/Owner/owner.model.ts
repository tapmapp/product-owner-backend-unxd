import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Owner {

    @Field(() => String)
    id: string;

    @Field(() => String)
    brandId: string;

    @Field(() => String)
    productReference: string;

    @Field(() => String)
    productIdentifier: string;

    @Field(() => String)
    transactionHash: string;

}
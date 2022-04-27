import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Owner {

    @Field()
    id: string;

    @Field()
    brandId: string;

    @Field()
    productReference: string;

    @Field()
    productId: string;

    @Field()
    transactionHash: string;

}
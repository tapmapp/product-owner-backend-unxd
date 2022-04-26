import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {

    @Field()
    id: string;

    @Field()
    productName: string;

    @Field()
    brandId: string;

    @Field()
    productReference: string;

    @Field()
    productId: string;

    @Field()
    productImg: string;

}
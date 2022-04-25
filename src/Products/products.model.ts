import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {

    @Field()
    id: string;

    @Field()
    productBrand: string;

    @Field()
    productReference: string;

    @Field()
    productId: string;

}
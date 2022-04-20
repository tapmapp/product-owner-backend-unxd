import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {

    @Field()
    id: string;

    @Field()
    identifier: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    img: string;

    @Field()
    ref: string;

}
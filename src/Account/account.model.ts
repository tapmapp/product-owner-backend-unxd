import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Account {

    @Field()
    id: string;

    @Field()
    accountEmail: string;

    @Field()
    accountPassword: string;

}
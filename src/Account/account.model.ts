import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Account {

    @Field()
    id: string;

    @Field()
    accountEmail: string;

    @Field()
    accountPassword: string;

    @Field()
    accountName: string;

    @Field()
    accountAvatar: string;

    @Field()
    accountWalletAddress: string;

    @Field()
    role: string;

}
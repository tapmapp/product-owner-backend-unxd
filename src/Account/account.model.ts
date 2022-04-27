import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Account {

    @Field(() => String)
    id: string;

    @Field(() => String)
    accountEmail: string;

    @Field(() => String)
    accountPassword: string;

    @Field(() => String)
    accountName: string;

    @Field(() => String)
    accountAvatar: string;

    @Field(() => String)
    accountWalletAddress: string;

    @Field(() => String)
    role: string;

}
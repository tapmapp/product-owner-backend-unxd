import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {

    @Field(() => String)
    id: string;

    @Field(() => String)
    productName: string;

    @Field(() => String)
    brandId: string;

    @Field(() => String)
    productReference: string;

    @Field(() => [String])
    productIdentifiers: string[];

    @Field(() => String)
    productImg: string;

    @Field(() => String, { nullable: true })
    nftTransactionHash?: string;

    @Field(() => String, { nullable: true })
    nftContractAddress?: string;

}

@ObjectType()
export class TransactionReceipt {

}
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

// MODULES
import { ProductsModule } from './Products/products.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ProductsModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
  ],
})
export class AppModule { }
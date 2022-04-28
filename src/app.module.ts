import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

// PRISMA
import { PrismaModule } from './prisma/prisma.module';

// MODULES
import { AccountModule } from './Account/account.module';
import { ProductModule } from './Product/product.module';
import { OwnerModule } from './Owner/owner.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    AccountModule,
    ConfigModule.forRoot(),
    ProductModule,
    OwnerModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
  ],
  providers: [AppGateway],
})
export class AppModule { }
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsRepository } from './products.repository';

// RESOLVERS
import { ProductsResolver } from './products.resolver';

// SERVICES
import { ProductsService } from './products.service';

@Module({
    providers: [ProductsResolver, ProductsService, ProductsRepository],
    exports: [ProductsRepository],
    imports: [
        PrismaModule,
        MulterModule.register({
            dest: './upload',
        })
    ],
})
export class ProductsModule { }

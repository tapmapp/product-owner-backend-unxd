import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductRepository } from './product.repository';

// RESOLVERS
import { ProductResolver } from './product.resolver';

// SERVICES
import { ProductService } from './product.service';

@Module({
    providers: [ProductResolver, ProductService, ProductRepository],
    exports: [ProductRepository],
    imports: [
        PrismaModule,
        MulterModule.register({
            dest: './upload',
        })
    ],
})
export class ProductModule { }

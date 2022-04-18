import { Injectable } from '@nestjs/common';

// MODELS
import { Product } from './products.model';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsRepository {

    constructor(private prisma: PrismaService) { }

    public async getProducts(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    public async getProduct(productId: string): Promise<Product> {
        return this.prisma.product.findFirst({
            where: { id: productId },
        });
    }

}
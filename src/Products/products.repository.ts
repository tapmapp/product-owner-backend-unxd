import { Injectable } from '@nestjs/common';

// MODELS
import { Product } from './products.model';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsRepository {

    constructor(private prisma: PrismaService) { }

    public async getProducts(): Promise<Product[]> {
        return this.prisma.product.findMany()
    }

    public async getProduct(productId: string): Promise<Product> {
        return this.prisma.product.findFirst({
            where: { productId },
        });
    }

    public async addProduct(productBrand: string, productReference: string, productId: string): Promise<Product> {
        return this.prisma.product.create({ data: { productBrand, productReference, productId } });
    }

    public async removeProduct(productId: string): Promise<void> {
        await this.prisma.product.delete({ where: { id: productId } });
    }

}

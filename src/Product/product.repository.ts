import { Injectable } from '@nestjs/common';

// MODELS
import { Product } from './product.model';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductRepository {

    constructor(private prisma: PrismaService) { }

    public async getProducts(): Promise<Product[]> {
        return this.prisma.product.findMany()
    }

    public async getProduct(productId: string): Promise<Product> {
        return this.prisma.product.findFirst({
            where: { productId },
        });
    }

    public async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productId: string): Promise<Product> {
        return this.prisma.product.create({ data: { productImg, productName, brandId, productReference, productId } });
    }

    public async removeProduct(productId: string): Promise<void> {
        await this.prisma.product.delete({ where: { id: productId } });
    }

}

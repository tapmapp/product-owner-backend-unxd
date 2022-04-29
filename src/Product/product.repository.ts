import { Injectable } from '@nestjs/common';

// MODELS
import { Product } from './product.model';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductRepository {

    constructor(private prisma: PrismaService) { }

    public async getProducts(): Promise<Product[]> {
        return this.prisma.product.findMany()
    }

    public async getProduct(productReference: string): Promise<Product> {
        return this.prisma.product.findFirst({
            where: { productReference },
        });
    }

    public async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productIdentifiers: string[]): Promise<Product> {
        return this.prisma.product.create({ data: { productImg, productName, brandId, productReference, productIdentifiers } });
    }

    public async updateProduct(data: Prisma.ProductUpdateInput, productReference: string): Promise<Product> {
        return this.prisma.product.update({ where: { productReference }, data });
    }

    public async removeProduct(productReference: string): Promise<void> {
        await this.prisma.product.delete({ where: { id: productReference } });
    }

}

import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise } from '@prisma/client';

// MODELS
import { Product, ProductItem } from './product.model';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

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

    public async getProductById(productId: string): Promise<Product> {
        return this.prisma.product.findFirst({
            where: { id: productId },
        });
    }

    public async getProductItem(productIdentifier: string): Promise<ProductItem> {
        return this.prisma.productItem.findFirst({
            where: { productIdentifier },
        });
    }

    public async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productIdentifiers: string[]): Promise<Product> {
        return this.prisma.product.create({ data: { productImg, productName, brandId, productReference, productIdentifiers } });
    }

    public addProductItems(productItems: ProductItem[]): PrismaPromise<Prisma.BatchPayload> {
        return this.prisma.productItem.createMany({ data: productItems });
    }

    public async updateProduct(data: Prisma.ProductUpdateInput, productId: string): Promise<Product> {
        return this.prisma.product.update({ where: { id: productId }, data });
    }

    public async updateProductItem(data: Prisma.ProductItemUpdateInput, productItemId: string): Promise<ProductItem> {
        return this.prisma.productItem.update({ where: { id: productItemId }, data });
    }

    public async removeProduct(productReference: string): Promise<void> {
        await this.prisma.product.delete({ where: { id: productReference } });
    }

}

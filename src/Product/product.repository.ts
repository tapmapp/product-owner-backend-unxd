import { Injectable } from '@nestjs/common';

// MODELS
import { Product, ProductItem } from './product.model';

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

    public async getProductItem(productItemId: string): Promise<ProductItem> {
        return this.prisma.productItem.findFirst({
            where: { id: productItemId },
        });
    }

    public async addProduct(productImg: string, productName: string, brandId: string, productReference: string, productIdentifiers: string[]): Promise<Product> {
        return this.prisma.product.create({ data: { productImg, productName, brandId, productReference, productIdentifiers } });
    }

    public addProductItems(productItems: ProductItem[]) {
        //return this.prisma.productItem.addMany()
    }

    public async updateProduct(data: Prisma.ProductUpdateInput, productId: string): Promise<Product> {
        return this.prisma.product.update({ where: { id: productId }, data });
    }

    public async removeProduct(productReference: string): Promise<void> {
        await this.prisma.product.delete({ where: { id: productReference } });
    }

}

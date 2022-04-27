import { Injectable } from '@nestjs/common';

// MODELS
import { Owner } from './owner.model';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OwnerRepository {

    constructor(private prisma: PrismaService) { }

    public async addOwner(brandId: string, productReference: string, productId: string, transactionHash: string): Promise<Owner> {
        return this.prisma.owner.create({ data: { brandId, productReference, productId, transactionHash } });
    }

}

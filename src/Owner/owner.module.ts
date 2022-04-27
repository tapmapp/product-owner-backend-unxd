import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

// REPOSITORY
import { OwnerRepository } from './owner.repository';

// RESOLVERS
import { OwnerResolver } from './owner.resolver';

// SERVICES
import { OwnerService } from './owner.service';

@Module({
    providers: [OwnerResolver, OwnerService, OwnerRepository],
    exports: [OwnerRepository],
    imports: [
        PrismaModule,
    ],
})
export class OwnerModule { }

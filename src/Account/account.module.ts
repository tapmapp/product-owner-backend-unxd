import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccountRepository } from './account.repository';

// RESOLVERS
import { AccountResolver } from './account.resolver';

// SERVICES
import { AccountService } from './account.service';

@Module({
    providers: [AccountResolver, AccountService, AccountRepository],
    exports: [AccountRepository],
    imports: [
        PrismaModule,
    ],
})
export class AccountModule { }

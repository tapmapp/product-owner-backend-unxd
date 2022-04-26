import { Injectable } from '@nestjs/common';

// MODELS
import { Account } from './account.model';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountRepository {

    constructor(private prisma: PrismaService) { }

    public async getAccounts(): Promise<Account[]> {
        return this.prisma.account.findMany()
    }

    public async getAccount(accountEmail: string): Promise<Account> {
        return this.prisma.account.findFirst({
            where: { accountEmail },
        });
    }

    public async addAccount(accountEmail: string, accountPassword: string, accountName: string): Promise<Account> {
        return this.prisma.account.create({ data: { accountEmail, accountPassword, accountName } });
    }

    public async removeAccount(accountEmail: string): Promise<void> {
        await this.prisma.account.delete({ where: { accountEmail } });
    }

}

import { Injectable } from '@nestjs/common';

// MODELS
import { Account } from './account.model';

// SERVICES
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {

    constructor(private accountRepository: AccountRepository) { }

    async getAccount(accountEmail: string): Promise<Account> {
        return await this.accountRepository.getAccount(accountEmail);
    }

    async getAccounts(): Promise<Account[]> {
        return await this.accountRepository.getAccounts();
    }

    async addAccount(accountEmail: string, accountPassword: string, accountName: string): Promise<Account> {
        return await this.accountRepository.addAccount(accountEmail, accountPassword, accountName);
    }

    async removeAccount(accountEmail: string): Promise<void> {
        await this.accountRepository.removeAccount(accountEmail);
    }

}

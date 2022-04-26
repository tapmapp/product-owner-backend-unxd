import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// MODELS
import { Account } from './account.model';

// SERVICES
import { AccountService } from './account.service';

@Resolver()
export class AccountResolver {

    constructor(private accountService: AccountService) { }

    @Query(() => Account)
    async getAccount(
        @Args('accountEmail') accountEmail: string
    ): Promise<Account> {
        const account = await this.accountService.getAccount(accountEmail);
        return account;
    }

    @Query(() => [Account])
    async getAccounts(): Promise<Account[]> {
        const accounts = await this.accountService.getAccounts();
        return accounts;
    }

    @Mutation(() => Account)
    async addAccount(
        @Args({ name: 'accountEmail', type: () => String }) accountEmail: string,
        @Args({ name: 'accountPassword', type: () => String }) accountPassword: string,
    ) {
        const account = await this.accountService.addAccount(accountEmail, accountPassword);
        return account;
    }

    @Mutation(() => Boolean)
    async removeAccount(
        @Args('accountEmail') accountEmail: string
    ): Promise<boolean> {
        await this.accountService.removeAccount(accountEmail);
        return true;
    }

}

import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    async logIn(accountEmail: string, accountPassword: string): Promise<any> {

        // CHECK IF ACCOUNT EXIST
        const account = await this.getAccount(accountEmail);
        if (account) {

            // CHECK IF PASSWORD MATCH
            const passwordMatch = await this.comparePassword(accountPassword, account.accountPassword);
            if (passwordMatch) {

                // GENERATE JWT TOKEN
                const token = jwt.sign({
                    email: account.accountEmail,
                    accountId: account.id
                },
                    process.env.SECRET,
                    {
                        expiresIn: '24h'
                    });

                return token;

            } else {

            }
        } else {

        }
    }

    async signIn(accountEmail: string, accountPassword: string, accountName: string): Promise<Account> {
        return await this.accountRepository.addAccount(accountEmail, this.hashPassword(accountPassword), accountName);
    }

    async removeAccount(accountEmail: string): Promise<void> {
        await this.accountRepository.removeAccount(accountEmail);
    }


    hashPassword(password: string): string {
        return bcrypt.hash(password, 10);
    }

    comparePassword(sentPassword: string, accountPassword): Promise<boolean> {
        return bcrypt.compare(sentPassword, accountPassword);
    }

}

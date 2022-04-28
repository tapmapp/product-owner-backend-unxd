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
            const passwordMatch = await bcrypt.compare(accountPassword, account.accountPassword);
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
        return await this.accountRepository.addAccount(accountEmail, bcrypt.hash(accountPassword, 10), accountName);
    }

    async removeAccount(accountEmail: string): Promise<void> {
        await this.accountRepository.removeAccount(accountEmail);
    }


    /*
    
        // CREATE ENCRYPTED PASSWORD
merchantSchema.methods.encryptPassword = password => {
  return bcrypt.hash(password, 10);
}

// CHECK IF PASSWORD MATCH
merchantSchema.methods.validPassword = (password, farmerPassword) => {
  return bcrypt.compare(password, farmerPassword);
}

    
    */



}

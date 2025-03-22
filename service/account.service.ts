import { RESTClient } from "../coinbase-client/rest";
import {  IFilterAccount } from "../types/IAccount.types";
import { repository } from "./repository.service";

export class AccountService {
    private static  client: RESTClient = new RESTClient(process.env.ACTIVE0_API_KEY, process.env.ACTIVE0_SECRET)
    
    public static async getAccountList(): Promise<IFilterAccount[]>{
        const accounts = await repository.getAccountList();
        const filteredAccounts: IFilterAccount[] = accounts.map((account) => ({
            id: account.id,
            name: account.name,
            currencies: account.currencies
        }));
        return filteredAccounts
    }

    public static async addCurrencyToAccount(accountID: number, currencies: string[]){
        return await repository.addCurrencyToAccount(accountID, currencies )
    }

    public static async getAccountBreakdown(accountID: string){
        const account = await this.client.getAccount({
            accountUuid: accountID
        })
        return account
    }
    public static async listAccounts(){
        const accounts = await this.client.listAccounts({
            limit: 100
        })
        return accounts
    }
}


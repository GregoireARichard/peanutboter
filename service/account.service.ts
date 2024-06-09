import { IAccount, IFilterAccount } from "../types/IAccount.types";
import { repository } from "./repository.service";

export class AccountService {
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
}
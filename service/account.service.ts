import { IAccount } from "../types/IAccount.types";
import { repository } from "./repository.service";

export class AccountService {
    public static async getAccountList(): Promise<IAccount[]>{
        return repository.getAccountList()
    }
}
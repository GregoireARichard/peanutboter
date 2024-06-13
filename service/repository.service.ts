import { ICheckLoginRequest } from "../types/ICheckLogin.type";
import { IPlaceOrder, Direction } from "../types/IPlaceOrder.type.";
import { db } from "./db.service";
import bcrypt from "bcrypt";
import { MarketService } from "./market.service";
import { utils } from "../utils/bcrypt.utils";
import { IAccount } from "../types/IAccount.types";

export class repository {
  public static async checkLogin(login: ICheckLoginRequest): Promise<boolean> {
    const query = `SELECT email, password FROM admin WHERE email = '${login.email}'`;
    let email = "";
    let password = "";
    let adminDetails: any;
    try {
      adminDetails = await db.query(query);
      if (adminDetails.length > 0) {
        email = adminDetails[0].email;
        password = adminDetails[0].password;
      }
      const validPassword = await bcrypt.compare(login.password, password);

      return login.email == email && validPassword;
      
    } catch (error) {
      console.log(error);
    }
    return false;
  }
  public static async signup(user: any): Promise<void> {
    const encryptedPassword = await utils.encryptPassword(user.password, 10);
    const query = `INSERT INTO admin (email, password) VALUES('${user.email}', '${encryptedPassword}')`;
    await db.query(query);

    return;
  }
  public static async placeOrder(placeOrder: IPlaceOrder): Promise<boolean> {
    const date = Date.now();
    const symbol = `${placeOrder.symbolTo}${placeOrder.symbolFrom}`;
    const current_currency =
      placeOrder.direction == Direction.sell
        ? placeOrder.symbolFrom
        : placeOrder.symbolTo;
    const exchangeRate = (await MarketService.getMarketData(symbol)).price;
    const queryInsert = `INSERT INTO transactions(currency_from, currency_to,
            exchange_rate_at_purchase, account_id, amount,current_currency, updated_at)
             VALUES('${placeOrder.symbolFrom}', '${placeOrder.symbolTo}',
            '${exchangeRate}',1, ${placeOrder.amount},'${current_currency}', to_timestamp(${date} / 1000.0));`;
    console.log(queryInsert);
    try {
      await db.query(queryInsert);
      return true;
    } catch (error) {
      console.log("placeOrder:", error);
      return false;
    }
  }

  public static async getAccountList(): Promise<IAccount[]> {
    let res: IAccount[] = [];
    const query = `select * from accounts;`;
    try {
      const results = await db.query(query);
      res = results.map((result: IAccount) => ({
        id: result.id,
        name: result.name,
        amount: result.amount,
        created_at: new Date(result.created_at),
        currencies: result.currencies,
        strategy: result.strategy,
        passive: result.passive,
        updated_at: new Date(result.updated_at),
      }));
    } catch (error) {
      console.log(error);
    }
    return res;
  }

  public static async addCurrencyToAccount(
    accountID: number,
    currencies: string[],
  ) {
    const query = `UPDATE accounts SET currencies = '${JSON.stringify(
      currencies,
    )}' WHERE id = ${accountID}`;
    try {
      const res = await db.query(query);
      console.log(res);
      return { message: "success" };
    } catch (error) {
      console.log(error);
      return { message: "error" };
    }
  }
}

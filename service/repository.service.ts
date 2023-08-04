import { ICheckLoginRequest } from "../types/ICheckLogin";
import { IPlaceOrder } from "../types/IPlaceOrder";
import { db } from "./db.service";
import bcrypt from "bcrypt";
import { MarketService } from "./market.service";

export class repository {
  public static async checkLogin(login: ICheckLoginRequest): Promise<boolean> {
    const query = "SELECT email, password FROM admin limit 1";
    const adminDetails = await db.query(query);
    const email = adminDetails.email;
    const password = adminDetails.password;
    const validPassword = await bcrypt.compare(login.password, password);

    if (login.email == email && validPassword) {
      return true;
    }
    return false;
  }
  public static async placeOrder(placeOrder: IPlaceOrder): Promise<boolean> {
    const symbol = `${placeOrder.symbolTo}${placeOrder.symbolFrom}`;
    const exchangeRate = (await MarketService.getMarketData(symbol)).price;
    const queryInsert = `INSERT INTO transactions(currency_from, currency_to,
            exchange_rate_at_purchase, account_id, amount)
             VALUES('${placeOrder.symbolFrom}', '${placeOrder.symbolTo}',
            '${exchangeRate}',1, ${placeOrder.amount});`;
    console.log(queryInsert);
    try {
      db.query(queryInsert);
      return true;
    } catch (error) {
      console.log("placeOrder:", error);
      return false;
    }
  }
}

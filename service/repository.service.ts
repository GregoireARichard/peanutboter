import { ICheckLoginRequest } from "../types/ICheckLogin"
import { IPlaceOrder } from "../types/IPlaceOrder";
import { db } from "./db.service"
import bcrypt from "bcrypt";

export class repository {
    public static async checkLogin(login: ICheckLoginRequest): Promise<boolean>{
        const query = "SELECT email, password FROM admin limit 1"
        const adminDetails = await db.query(query)
        const email = adminDetails.email
        const password = adminDetails.password
        const validPassword = await bcrypt.compare(login.password, password);

        if(login.email == email && validPassword){
            return true
        }
        return false
    }
    public static async placeOrder(placeOrder: IPlaceOrder): Promise<boolean>{
        const query = `INSERT INTO transactions(currency_from, currency_to,
            exchange_rate_at_purchase, account_id, amount)
             VALUES('${placeOrder.symbolFrom}', '${placeOrder.symbolTo}',
            ${placeOrder.exchangeRate},1, ${placeOrder.amount});`
            console.log(query)
       try {
           db.query(query)
           return true
       } catch (error) {
           console.log("placeOrder:", error)
           return false
       }
    }
}
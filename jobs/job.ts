import { db } from "../service/db.service";
import { MarketService } from "../service/market.service";
import cron from "cron";
import { IKlines } from "../types/IKlines";

export class Job {
  public static async placeOrder() {
    try {
      let placeOrder: boolean = false;
      if (
        await MarketService.chooseOrder({
          currency_from: "USDT",
          currency_to: "BTC",
        })
      ) {
        placeOrder = true;
        console.log("order placed");
      }
    } catch (error) {
      console.log(error);
    }
  }
  public static async buyWhenCurveFalling(){
    const klines: IKlines = {
      symbol: "ETHUSDT",
      interval: "1d",
      limit: 4
    }
    if (await MarketService.isCurveFalling(klines)){
        
    }
  }
}


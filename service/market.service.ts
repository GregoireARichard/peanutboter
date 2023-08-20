import axios from "axios";
import { IGetMarketDataResponse } from "../types/IGetMarketDataResponse";
import { IPlaceOrder } from "../types/IPlaceOrder";
import { repository } from "./repository.service";
import { IChooseOrder } from "../types/IChooseOrder";
import { db } from "./db.service";
import { IKlines, klinesResult } from "../types/IKlines";
import { apiCall } from "../apiCalls/apicall";
import { helpers } from "./helpers/helper";

export const MIN_YIELD = 1.03;

export class MarketService {
  public static async getMarketData(
    symbol: string,
  ): Promise<IGetMarketDataResponse> {
    let marketData: IGetMarketDataResponse = {
      symbol: symbol,
      price: "",
    };
    try {
      const apiKey = process.env.API_KEY;
      const endpoint = `https://api.binance.com/api/v3/ticker/price`;

      const response = await axios.get(endpoint, {
        params: { symbol },
        headers: { "X-MBX-APIKEY": apiKey },
      });

      marketData = response.data;
    } catch (error) {
      console.error("getMarketData:", error);
    }
    return marketData;
  }
  public static async placeOrder(placeOrder: IPlaceOrder): Promise<boolean> {
    if (await repository.placeOrder(placeOrder)) return true;
    return false;
  }
  public static async chooseOrder(chooseOrder: IChooseOrder): Promise<Boolean> {
    const symbol = `${chooseOrder.currency_to}${chooseOrder.currency_from}`;

    try {
      const currentPrice = (await this.getMarketData(symbol)).price;
      const query = `select exchange_rate_at_purchase from transactions where currency_from = '${chooseOrder.currency_from}' and
            currency_to = '${chooseOrder.currency_to}'`;

      const minPriceToBuy =
        (await db.query(query)).exchange_rate_at_purchase * MIN_YIELD;
      console.log(
        "current price : ",
        currentPrice,
        "min yield to sell : ",
        minPriceToBuy,
      );

      return parseFloat(currentPrice) > minPriceToBuy;
    } catch (error) {
      console.log("chooseOrder:", error);
    }
    return false;
  }

  public static async isCurveFalling(klinesParams: IKlines): Promise<Boolean> {
    const data = await apiCall.klines(klinesParams); 
    const parsedArr = helpers.parseKlines(data);
    let averageArr: number[] = [];

    parsedArr.map((e: number[]) => {
      let average: number = 0;
      e.map((item) => {
        average += item;
      });
      average /= e.length;
      averageArr.push(average);
    });
    const min = Math.min(averageArr[0], averageArr[averageArr.length - 1]);
    const max = Math.max(averageArr[0], averageArr[averageArr.length - 1]);

    if (max - min > max * 0.05) {
      return true;
    }

    return false;
  }
}

import axios from "axios";
import { IKlines, klinesResult } from "../types/IKlines.type";
import { IGetMarketDataResponse } from "../types/IGetMarketDataResponse.type";

export class apiCall {
  public static async klines(klinesParams: IKlines): Promise<klinesResult[]> {
    let data: any[] = [];
    try {
      const apiKey = process.env.API_KEY;
      const endpoint = `https://api.binance.com/api/v1/klines`;

      const response = await axios.get(endpoint, {
        params: {
          symbol: klinesParams.symbol,
          interval: klinesParams.interval,
          limit: klinesParams.limit,
        },
        headers: { "X-MBX-APIKEY": apiKey },
      });
      data = response.data;
    } catch (error) {
      console.error("getMarketData:", error);
    }
    return data as klinesResult[];
  }
  public static async getPrices(
    symbol: string,
  ): Promise<IGetMarketDataResponse> {
    let res: IGetMarketDataResponse = {
      symbol: "",
      price: "",
    };
    try {
      const apiKey = process.env.API_KEY;
      const endpoint = `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`;

      const response = (await axios.get(endpoint)).data;
      res = response.data.rates.USD;

    } catch (error) {
      console.error("getMarketData:", error);
    }
    return res;
  }

  public static async getTipRanksAssets(){
    const endpoint = "https://tr-cdn.tipranks.com/assets/prod/cryptocurrency/payload.json"
    let data = []
    try {
      const response = await axios.get(endpoint);
       data = response.data;
    } catch (error) {
      console.error("getMarketData:", error);
    }
    return data
  }
}

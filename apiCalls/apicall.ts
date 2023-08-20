import axios from "axios";
import { IKlines, klinesResult } from "../types/IKlines";

export class apiCall {
    public static async klines(klinesParams: IKlines): Promise<klinesResult[]>{
        let data: any[] = []
        try {
            const apiKey = process.env.API_KEY;
            const endpoint = `https://api.binance.com/api/v1/klines`;
      
            const response = await axios.get(endpoint, {
              params: { 
                symbol : klinesParams.symbol,
                interval : klinesParams.interval,
                limit : klinesParams.limit
               },
              headers: { "X-MBX-APIKEY": apiKey },
            });
            data = response.data
          } catch (error) {
            console.error("getMarketData:", error);
          }
          return data as klinesResult[]
    }
}
import axios from "axios"
import { IGetMarketDataResponse } from "../types/IGetMarketDataResponse"
import { IPlaceOrder } from "../types/IPlaceOrder"
import { repository } from "./repository.service"
import { IChooseOrder } from "../types/IChooseOrder"

export const MIN_YIELD = 1.03

export class MarketService {
    public static async getMarketData(symbol: string): Promise<IGetMarketDataResponse> {
        let marketData: IGetMarketDataResponse = {
            symbol: symbol,
            price: ""
        }
        try {
            const apiKey = process.env.API_KEY
            const endpoint = `https://api.binance.com/api/v3/ticker/price`
        
            const response = await axios.get(endpoint, {
              params: { symbol },
              headers: { 'X-MBX-APIKEY': apiKey },
            })
        
            marketData = response.data
            

          } catch (error) {
                console.error("getMarketData:", error)
          }
        return marketData
    }
    public static async placeOrder(placeOrder: IPlaceOrder): Promise<boolean>{
        if(await repository.placeOrder(placeOrder)) return true
        return false
    }
    public static async chooseOrder(chooseOrder: IChooseOrder): Promise<Boolean> {
        const currentPrice = (await this.getMarketData("BTCUSDT")).price
        return parseFloat(currentPrice) > chooseOrder.boughtAtPrice * MIN_YIELD
    }
}
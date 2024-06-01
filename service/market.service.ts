import { IGetMarketDataResponse } from "../types/IGetMarketDataResponse.type";
import { IPlaceOrder } from "../types/IPlaceOrder.type.";
import { repository } from "./repository.service";
import { IChooseOrder } from "../types/IChooseOrder.type";
import { db } from "./db.service";
import { IKlines } from "../types/IKlines.type";
import { apiCall } from "../apiCalls/apicall";
import { helpers } from "./helpers/helper";
import { IGetCryptoDataresult } from "../types/IGetCryptoData.typeResult";

export const MIN_YIELD = 1.03;

export class MarketService {
  public static async getMarketData(
    symbol: string,
  ): Promise<IGetMarketDataResponse> {
    return await apiCall.getPrices(symbol);
  }
  public static async placeOrder(placeOrder: IPlaceOrder): Promise<boolean> {
    return await repository.placeOrder(placeOrder);
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

  public static async isCurveFalling(klinesParams: IKlines): Promise<boolean> {
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

  public static async getCryptosList() {
    interface coinComperator {
      name: string;
      marketCap: number;
    }
    const data = await apiCall.getTipRanksAssets();
    const coinsData = data.CryptoFolder.data.cryptosList.coins;
    const coinsNames: coinComperator[] = [];

    coinsData.map((coin: { name: string; marketCap: number }) => {
      const name = coin.name;
      const marketCap = coin.marketCap;
      if (coin.name != "Tether" && coin.name != "Toncoin"){
        coinsNames.push({ name: name, marketCap: marketCap });
      }
     
    });
    coinsNames.sort((a, b) => b.marketCap - a.marketCap);

    const top20CoinNames: string[] = coinsNames
      .slice(0, 20)
      .map((coin) => coin.name);
    return top20CoinNames;
  }

  public static async getCryptoData(
    cryptoTipRanksId: string,
    klinesParams: IKlines,
  ) {
    const data = await apiCall.getTipRanksAssets();
    const coinsData = data.CryptoFolder.data.cryptosList.coins;

    let result: Partial<IGetCryptoDataresult> = {};

    coinsData.map((coin: { name: string }) => {
      if (coin.name === cryptoTipRanksId) {
        result = coin;
      }
    });

    klinesParams.symbol = result.ticker
      ? `${result.ticker.replace("-", "")}T`
      : "BTCUSDT";

    const resultKlines = await apiCall.klines(klinesParams);
    result.ticker = klinesParams.symbol;
    result.prices = resultKlines;

    return result;
  }
}

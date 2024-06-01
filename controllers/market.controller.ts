import express from "express";
import { MarketService } from "../service/market.service";
import { IGetMarketDataResponse } from "../types/IGetMarketDataResponse.type";
import { IPlaceOrder } from "../types/IPlaceOrder.type.";
import { IChooseOrder } from "../types/IChooseOrder.type";
import { IKlines } from "../types/IKlines.type";

export class MarketController {
  public static async getMarketData(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const symbol = typeof req.query.symbol === "string" ? req.query.symbol : "";
    const result: IGetMarketDataResponse = await MarketService.getMarketData(
      symbol,
    );
    res.json(result);
  }
  public static async placeOrder(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const symbolTo = req.body.symbolTo;
    const symbolFrom = req.body.symbolFrom;
    const amount = req.body.amount;
    const direction = req.body.direction;

    const placeOrder: IPlaceOrder = {
      symbolTo: symbolTo,
      symbolFrom: symbolFrom,
      amount: amount,
      direction: direction,
    };
    const result: boolean = await MarketService.placeOrder(placeOrder);
    res.json(result);
  }
  public static async orderChooser(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const currency_from = req.body.currency_from;
    const currency_to = req.body.currency_to;
    const chooseOrder: IChooseOrder = {
      currency_from: currency_from,
      currency_to: currency_to,
    };
    const result: Boolean = await MarketService.chooseOrder(chooseOrder);
    res.json(result);
  }

  public static async getCryptoList(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const results = await MarketService.getCryptosList();
    res.json(results);
  }

  public static async getCryptoInfo(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const crypto = typeof req.query.crypto === "string" ? req.query.crypto : "";
    const symbol = typeof req.query.symbol === "string" ? req.query.symbol : "";
    const interval = typeof req.query.interval === "string" ? req.query.interval : "";
    const limit = typeof req.query.limit === "number" ? req.query.limit : 10;
    const klinesParams: IKlines = {
      symbol: symbol ? symbol : "",
      interval: interval,
      limit: limit,
    };
    const results = await MarketService.getCryptoData(crypto, klinesParams);
    res.send(results);
  }
}

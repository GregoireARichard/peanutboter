import express from "express";
import { MarketService } from "../service/market.service";
import { IGetMarketDataResponse } from "../types/IGetMarketDataResponse";
import { IPlaceOrder } from "../types/IPlaceOrder";
import { IChooseOrder } from "../types/IChooseOrder";

export class MarketController {
  public static async getMarketData(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const symbol = typeof req.query.symbol === "string" ? req.query.symbol : "";
    const result = await MarketService.getMarketData(symbol);
    res.json(result);
  }
  public static async placeOrder(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const symbolTo = req.body.symbolTo;
    const symbolFrom = req.body.symbolFrom;
    const amount = req.body.amount;
    const placeOrder: IPlaceOrder = {
      symbolTo: symbolTo,
      symbolFrom: symbolFrom,
      amount: amount,
    };
    const result = await MarketService.placeOrder(placeOrder);
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
    const result = await MarketService.chooseOrder(chooseOrder);
    res.json(result);
  }
}

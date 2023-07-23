import express  from "express";
import { MarketService } from "../service/market.service";
import { IGetMarketDataResponse } from "../types/IGetMarketDataResponse";
import { IPlaceOrder } from "../types/IPlaceOrder";
import { IChooseOrder } from "../types/IChooseOrder";

export class MarketController {
    public static async  getMarketData(req: express.Request, res: express.Response): Promise<void>{
        const symbol = typeof req.query.symbol === "string" ? req.query.symbol : ""
        const result = await MarketService.getMarketData(symbol)
        res.json(result)
    }
    public static async placeOrder(req: express.Request, res: express.Response): Promise<void> {
        const symbolTo = req.body.symbolTo
        const symbolFrom = req.body.symbolFrom
        const amount = req.body.amount
        const exchangeRate = req.body.exchangeRate
        const placeOrder: IPlaceOrder = {
            symbolTo: symbolTo,
            symbolFrom: symbolFrom,
            exchangeRate: exchangeRate,
            amount: amount,
        }
        const result = await MarketService.placeOrder(placeOrder)
        res.json(result)
    }
    public static async orderChooser(req: express.Request, res: express.Response): Promise<void>{
        const currentPrice = req.body.currentPrice
        const boughtAtPrice = req.body.boughtAtPrice
        const chooseOrder: IChooseOrder = {
            currentPrice: currentPrice,
            boughtAtPrice: boughtAtPrice
        }
        const result = await MarketService.chooseOrder(chooseOrder)
        res.json(result)
    }
}
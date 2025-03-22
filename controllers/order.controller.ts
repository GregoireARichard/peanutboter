import { Request, Response } from "express";
import { OrderService } from "../service/order.service";

export class OrderController {
    public static async createOrder(req: Request, res: Response) {
        try {
            const order = await OrderService.createOrder(req.body);
            res.status(200).json(order);
        } catch (error) {
            // Handle Coinbase API specific errors
            if (error instanceof Error) {
                if ('statusCode' in error) {
                    // Handle specific Coinbase error codes
                    const statusCode = (error as any).statusCode;
                    res.status(statusCode).json({
                        error: error.message,
                        status: 'error'
                    });
                }
            } else {
                // Handle unknown errors
                res.status(500).json({
                    error: 'Unknown error occurred',
                    status: error
                });
            }
        }
    }
}
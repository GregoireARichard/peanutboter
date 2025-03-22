import { RESTClient } from "../coinbase-client/rest"
import { CreateOrderRequest } from "../coinbase-client/rest/types/orders-types"
import { OrderConfiguration, MarketMarketIoc, LimitLimitGtc } from "../coinbase-client/rest/types/common-types"
import { PortfolioType } from "../coinbase-client/rest/types/portfolios-types"

export class OrderService {
    public static async createOrder(order: CreateOrderRequest){
        const client = new RESTClient(process.env.ACTIVE0_API_KEY, process.env.ACTIVE0_SECRET)
        try {
            // First, get available portfolios
            let portfolios = await client.listPortfolios({ 
                portfolioType: PortfolioType.CONSUMER 
            });
            const parsedPortfolios = JSON.parse(portfolios as unknown as string);
          //  console.log(parsedPortfolios)

            // Check if portfolios exists and has items
            if (!parsedPortfolios?.portfolios?.length) {
                return {
                    success: false,
                    error: "No available portfolios found"
                }
            }

            // Use the first available portfolio if none specified
            if (!order.retailPortfolioId) {
                order.retailPortfolioId = parsedPortfolios.portfolios[0].uuid;
            }

            // If in test environment, modify the order configuration
            if (process.env.environment === "test") {
                const modifiedConfig = { ...order.orderConfiguration } as OrderConfiguration;
                if ('market_market_ioc' in modifiedConfig) {
                    const marketConfig = modifiedConfig.market_market_ioc as MarketMarketIoc;
                    if ('quote_size' in marketConfig) {
                        marketConfig.quote_size = "0";
                    }
                    if ('base_size' in marketConfig) {
                        marketConfig.base_size = "0";
                    }
                } else if ('limit_limit_gtc' in modifiedConfig) {
                    const limitConfig = modifiedConfig.limit_limit_gtc as LimitLimitGtc;
                    limitConfig.baseSize = "0";
                }
                order = {
                    ...order,
                    orderConfiguration: modifiedConfig
                };
            }

            // Add clientOrderId if not provided
            if (!order.clientOrderId) {
                order.clientOrderId = `order_${Date.now()}`;
            }
            console.log(order)
            return await client.createOrder(order);
        } catch (error) {
            console.log(error)
           // throw with more context if needed
            if (error instanceof Error) {
                if (error.message.includes("account is not available")) {
                    throw new Error(`Portfolio ${order.retailPortfolioId} is not available. Please verify the portfolio exists and is active.`);
                }
            }
            throw error;
        }
    }
}
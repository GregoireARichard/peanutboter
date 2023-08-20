import { apiCall } from "../apiCalls/apicall";
import { MarketService } from "../service/market.service";
import { IKlines } from "../types/IKlines";


describe('is curve falling function', () => {
  it('checks if whether a curve is falling', async()  => {
    const klinesParams: IKlines = {
        symbol : "ETHUSDT",
        interval : "1d",
        limit : 4
    }
    const result = await apiCall.klines(klinesParams);
    expect(result.length).toBe(klinesParams.limit)
  });
}); 
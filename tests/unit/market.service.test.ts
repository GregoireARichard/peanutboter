import { MarketService } from "../../service/market.service";
import { IKlines, klinesResult } from "../../types/IKlines";
import { apiCall } from "../../apiCalls/apicall";
import { mockKlinesResponseFalse, mockKlinesResponseTrue } from "./data/data";

jest.mock('../../apiCalls/apicall');
const klinesParams: IKlines = {
  symbol: "ETHUSDT",
  interval: "1d",
  limit: 5
}

describe('isCurveFalling', () => {
  test('should return true when the curve is falling', async () => {
    // Mocks the API call
    jest.spyOn(apiCall, 'klines').mockResolvedValue(mockKlinesResponseTrue);

    const result = await MarketService.isCurveFalling(klinesParams);

    expect(result).toBe(true);
    expect(apiCall.klines).toHaveBeenCalledWith(klinesParams);
  });

  test('should return false when the curve is not falling', async () => {
    // Mock the API call
  jest.spyOn(apiCall, 'klines').mockResolvedValue(mockKlinesResponseFalse);

    const result = await MarketService.isCurveFalling(klinesParams);

    expect(result).toBe(false);
    expect(apiCall.klines).toHaveBeenCalledWith(klinesParams);
  });
});





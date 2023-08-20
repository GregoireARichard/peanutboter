import { MarketService } from "../service/market.service";
import { IKlines, klinesResult } from "../types/IKlines";
import { apiCall } from "../apiCalls/apicall";

jest.mock('../apiCalls/apicall');
// describe('is curve falling function', () => {
//   it('checks if whether a curve is falling', async()  => {
//     const klinesParams: IKlines = {
//         symbol : "ETHUSDT",
//         interval : "1d",
//         limit : "5"
//     }
//     const result = await MarketService.isCurveFalling(klinesParams);
//     expect(result).toBe(true);
//   });
// }); 
const klinesParams: IKlines = {
  symbol: "ETHUSDT",
  interval: "1d",
  limit: 5
}
const mockKlinesResponseTrue: klinesResult[] = [
  [
      1692144000000,
      "1828.98000000",
      "1831.52000000",
      "1798.17000000",
      "1807.81000000",
      "205430.73680000",
      1692230399999,
      "373631455.89955800",
      311372,
      "94619.39960000",
      "172094672.81802700",
      "0"
  ],
  [
      1692230400000,
      "1807.81000000",
      "1809.99000000",
      "1550.00000000",
      "1681.49000000",
      "812138.21590000",
      1692316799999,
      "1390504308.00338100",
      906515,
      "389817.18110000",
      "666353412.64305200",
      "0"
  ],
  [
      1692316800000,
      "1681.49000000",
      "1699.40000000",
      "1641.02000000",
      "1661.59000000",
      "538083.10180000",
      1692403199999,
      "901117750.71732300",
      597838,
      "256018.67180000",
      "428794110.08938600",
      "0"
  ],
  [
      1692403200000,
      "1661.60000000",
      "1696.72000000",
      "1654.31000000",
      "1669.67000000",
      "231919.04850000",
      1692489599999,
      "387407573.38040000",
      312174,
      "116535.73010000",
      "194692011.36082900",
      "0"
  ],
  [
      1692489600000,
      "1669.68000000",
      "1679.79000000",
      "1662.03000000",
      "1678.20000000",
      "158857.19400000",
      1692575999999,
      "265366987.73722500",
      229062,
      "76260.52860000",
      "127381638.97391600",
      "0"
  ]
]
const mockKlinesResponseFalse: klinesResult[] = [
  [
      1692316800000,
      "1681.49000000",
      "1699.40000000",
      "1641.02000000",
      "1661.59000000",
      "538083.10180000",
      1692403199999,
      "901117750.71732300",
      597838,
      "256018.67180000",
      "428794110.08938600",
      "0"
  ],
  [
      1692403200000,
      "1661.60000000",
      "1696.72000000",
      "1654.31000000",
      "1669.67000000",
      "231919.04850000",
      1692489599999,
      "387407573.38040000",
      312174,
      "116535.73010000",
      "194692011.36082900",
      "0"
  ],
  [
      1692489600000,
      "1669.68000000",
      "1680.16000000",
      "1662.03000000",
      "1680.02000000",
      "159930.04730000",
      1692575999999,
      "267168133.51077300",
      231090,
      "76906.33620000",
      "128465952.44690700",
      "0"
  ]
]
describe('isCurveFalling', () => {
  test('should return true when the curve is falling', async () => {
    // Mock the API call
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





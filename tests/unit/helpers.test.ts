import { helpers } from "../../service/helpers/helper";
import { klinesResult } from "../../types/IKlines.type";

describe("should return a parsed klines array of number", () => {
  it("parses the kline", () => {
    const klinesResult: klinesResult[] = [
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
        "0",
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
        "0",
      ],
      [
        1692403200000,
        "1661.60000000",
        "1683.92000000",
        "1654.31000000",
        "1682.60000000",
        "136452.45900000",
        1692489599999,
        "227072874.27495300",
        204848,
        "69194.84960000",
        "115161659.86945400",
        "0",
      ],
    ];
    const result = helpers.parseKlines(klinesResult)
    expect(result).toBeInstanceOf(Array);

    result.map((e) => {
        expect(e).toBeInstanceOf(Array);
        expect(e.every(item => typeof item === "number")).toBe(true);
        expect(e.length).toBe(4)
    });

  });
});

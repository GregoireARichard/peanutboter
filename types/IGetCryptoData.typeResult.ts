import { klinesResult } from "./IKlines.type";

export interface IGetCryptoDataresult {
  ticker: string;
  type: string;
  marketCap: number;
  name: string;
  gain: IGain;
  volume: number;
  volumeTier: number;
  priceRange: IPriceRange;
  supply: ISupply;
  marketCapDominance: number;
  prices: klinesResult[];
}
interface IGain {
  monthly: number;
  threeMonth: number;
  sixMonths: number;
  yearly: number;
  ytd: number;
  daily: number;
  week: number;
}
interface IPriceRange {
  all: IAll;
}
interface IAll {
  percent: number;
  high: number;
  low: number;
  dateHigh: Date;
}
interface ISupply {
  circulation: number;
  max: number;
  total: number;
}

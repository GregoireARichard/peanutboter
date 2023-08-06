export interface IPlaceOrder {
  symbolTo: number;
  symbolFrom: string;
  amount: number;
  direction: Direction
}

export enum Direction {
  buy,
  sell
}
//price: number, symbolTo: string, symbolFrom: string, exchangeRate: number, amout: number

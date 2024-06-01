export interface IKlines {
    symbol: string,
    interval: string,
    limit: number
}
export type klinesResult = [
    number,     // Timestamp
    string,     // Open
    string,     // High
    string,     // Low
    string,     // Close
    string,     // Volume
    number,     // Close timestamp
    string,     // Quote asset volume
    number,     // Number of trades
    string,     // Taker buy base asset volume
    string,     // Taker buy quote asset volume
    string      // Ignore
];

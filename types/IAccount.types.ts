export interface IAccount {
    id: number,
    name: string,
    amount: number,
    created_at: Date,
    currencies: string[],
    strategy: string,
    passive: string,
    updated_at: Date
}
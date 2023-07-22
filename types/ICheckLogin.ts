export interface ICheckLoginRequest {
    email: string,
    password: string
}
export interface ICheckLoginResponse {
    jwt: string
}
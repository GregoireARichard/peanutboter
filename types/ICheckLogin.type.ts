export interface ICheckLoginRequest {
  email: string;
  password: string;
  id: number;
}
export interface ICheckSignupRequest {
  email: string;
  password: string;
}
export interface ICheckLoginResponse {
  jwt: string;
}

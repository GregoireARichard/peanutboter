import { ICheckLoginRequest, ICheckLoginResponse } from "../types/ICheckLogin.type";
import { IErrorLoginResponse } from "../types/IErrorLoginResponse.type";
import { repository } from "./repository.service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_AUD = "api-admin"
const ISSUER = "api-auth"
const SIGNING =  process.env.PUB_KEY

export class AdminService {
  private static generateJwt(email: string): string {
      const encoded = jwt.sign({
          email: email
      }, SIGNING ? SIGNING : '', {
              expiresIn: '30 minutes',
              audience: ADMIN_AUD,
              issuer: ISSUER
      })
      return encoded
  }
  public static async login(login: ICheckLoginRequest): Promise<ICheckLoginResponse | IErrorLoginResponse>{
        if(await repository.checkLogin(login)){
            const encoded = this.generateJwt(login.email)
            return {jwt: encoded}
        }
        return {error: "wrong credentials"}
  }

  public static async signup(login: ICheckLoginRequest): Promise<void> {
    await repository.signup(login)
      
    return 
  }
}
import { ICheckLoginRequest, ICheckLoginResponse } from "../types/ICheckLogin";
import { IErrorLoginResponse } from "../types/IErrorLoginResponse";
import { repository } from "./repository.service";
import { JWT } from "../utility/jwt";

const ADMIN_AUD = "api-admin"
const ISSUER = "api-auth"
export class AdminService{
    public static async login(login: ICheckLoginRequest): Promise<ICheckLoginResponse | IErrorLoginResponse>{
        if(await repository.checkLogin(login)){
            const jwt = new JWT()
            const encoded = await jwt.create({
                adminId: login.email,
              }, {
                expiresIn: '30 minutes',
                audience: ADMIN_AUD,
                issuer: ISSUER
              }) as string;
            return {jwt: encoded}
        }
        return {error: "wrong credentials"}
    }
}
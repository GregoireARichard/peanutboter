import { ICheckLoginRequest } from "../types/ICheckLogin"
import { db } from "./db.service"
import bcrypt from "bcrypt";

export class repository {
    public static async checkLogin(login: ICheckLoginRequest): Promise<boolean>{
        const query = "SELECT email, password FROM admin limit 1"
        const adminDetails = await db.query(query)
        const email = adminDetails.email
        const password = adminDetails.password
        const validPassword = await bcrypt.compare(login.password, password);

        if(login.email == email && validPassword){
            return true
        }
        return false
    }
}
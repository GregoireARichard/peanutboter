import { AdminService } from "../service/admin.service";
import express  from "express";
import { ICheckLoginRequest } from "../types/ICheckLogin";

export class AdminController {
    public static async login(req: express.Request, res: express.Response): Promise<any>{
        const email = req.body.email
        const password = req.body.password
        const IAdminReq: ICheckLoginRequest = {
            email : email,
            password: password
        }
        const result = await AdminService.login(IAdminReq)
        res.json(result)
    }
}
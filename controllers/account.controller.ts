import express from "express";
import { AccountService } from "../service/account.service";

export class AccountController {
  public static async getAccountList(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const result = await AccountService.getAccountList();
    res.json(result);
  }
}

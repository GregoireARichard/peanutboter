import express from "express";
import { AccountService } from "../service/account.service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { repository } from "../service/repository.service";

dotenv.config();

const SIGNING = process.env.PUB_KEY;
const SIGNING_KEY = typeof SIGNING === "string" ? SIGNING : "";

export class AccountController {
  public static async getAccountList(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({ error: "Missing authorization header" });
      return;
    }
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, SIGNING_KEY);
      if (decoded) {
        const result = await AccountService.getAccountList();
        res.json(result);
      }
    } catch (err) {
      res.status(401).json({ message: "Token expired" });
      console.log(err);
    }
  }
  public static async addCurrencyToAccount(
    req: express.Request,
    res: express.Response,
  ) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({ error: "Missing authorization header" });
      return;
    }
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
    }

    const accountID = req.body.accountID;
    const currencies = req.body.currencies;
    console.log(accountID, currencies)
    if (!currencies || !accountID) {
      res.status(401).json({ message: "invalid arguments" });
    }

    try {
      const result = await AccountService.addCurrencyToAccount(
        accountID,
        currencies,
      );
      res.json(result);
    } catch (error) {
      res.status(401).json({ message: "Token expired" });
    }
  }
  public static async getAccountBreakdown(
    req: express.Request,
    res: express.Response,
  ) {
    const accountID = req.params.accountID;
    if (!accountID) {
      res.status(401).json({ message: "invalid arguments" });
    }
    const result = await AccountService.getAccountBreakdown(accountID);
    
    const json = JSON.parse(result as unknown as string)
    res.send(json);
  }
  public static async listAccounts(
    req: express.Request,
    res: express.Response,
  ) {
    const result = await AccountService.listAccounts();

    const json = JSON.parse(result as unknown as string)
    res.send(json);
  }
}

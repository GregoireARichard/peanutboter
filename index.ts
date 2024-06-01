import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { AdminController } from "./controllers/admin.controller";
import cors from "cors";
import { MarketController } from "./controllers/market.controller";
import cron from "cron";
import { Job } from "./jobs/job";
import { AccountController } from "./controllers/account.controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const cronExpression = "*/15 * * * * *";

const cronJob = new cron.CronJob(cronExpression, Job.placeOrder);
//cronJob.start();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
//admin
app.post("/admin/login", AdminController.login);
// app.post("/admin/signup", AdminController.signup);

// front controls
app.get("/controls/account-list", AccountController.getAccountList)
//market
app.get("/market/crypto-list", MarketController.getCryptoList)
app.get("/market/crypto-info", MarketController.getCryptoInfo)
app.post("/market/order", MarketController.placeOrder);
app.get("/market/data", MarketController.getMarketData);
app.post("/market/order-chooser", MarketController.orderChooser);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

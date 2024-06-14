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
const appLink = process.env.APP_LINK ? process.env.APP_LINK : "main--toast-peanutbot.netlify.app"

app.use(express.json());
// CORS Configuration
const corsOptions = {
  origin: appLink,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204 // For legacy browser support
};

app.use(cors(corsOptions));

// Handle Preflight Requests
app.options('*', cors(corsOptions));

const cronExpression = "*/15 * * * * *";

const cronJob = new cron.CronJob(cronExpression, Job.placeOrder);
//cronJob.start();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
//admin
//app.post("/admin/login", AdminController.login);
// app.post("/admin/signup", AdminController.signup);
app.post("/admin/login", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', appLink);
  AdminController.login(req, res);
});
// front controls
app.get("/controls/account-list", AccountController.getAccountList)
app.post("/controls/currency", AccountController.addCurrencyToAccount)
//market
app.get("/market/crypto-list", MarketController.getCryptoList)
app.get("/market/crypto-info", MarketController.getCryptoInfo)
app.post("/market/order", MarketController.placeOrder);
app.get("/market/data", MarketController.getMarketData);
app.post("/market/order-chooser", MarketController.orderChooser);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port:${port}`);
});

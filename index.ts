import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { AdminController } from "./controllers/admin.controller";
import cors from "cors";
import { MarketController } from "./controllers/market.controller";
import cron from "cron";
import { Job } from "./jobs/job";
import { AccountController } from "./controllers/account.controller";
import { OrderController } from "./controllers/order.controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const appLink = process.env.APP_LINK || "main--toast-peanutbot.netlify.app";

app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: [appLink, "https://toast-peanutbot.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
  optionsSuccessStatus: 204, 
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

const cronExpression = "*/15 * * * * *";

const cronJob = new cron.CronJob(cronExpression, Job.placeOrder);
//cronJob.start();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/admin/:id/login", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", appLink);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  AdminController.login(req, res);
});

// Front controls
app.get("/controls/account-list", AccountController.getAccountList);
app.post("/controls/currency", AccountController.addCurrencyToAccount);
app.get("/controls/account-breakdown/:accountID", AccountController.getAccountBreakdown);
app.get("/controls/list-accounts", AccountController.listAccounts);
app.post("/controls/create-order", OrderController.createOrder);
// Market
app.get("/market/crypto-list", MarketController.getCryptoList);
app.get("/market/crypto-info", MarketController.getCryptoInfo);
app.post("/market/order", MarketController.placeOrder);
app.get("/market/data", MarketController.getMarketData);
app.post("/market/order-chooser", MarketController.orderChooser);



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port:${port}`);
});

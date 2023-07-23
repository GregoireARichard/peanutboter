import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AdminController } from './controllers/admin.controller';
import cors from "cors"
import { MarketController } from './controllers/market.controller';
dotenv.config();

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
});
//admin
app.post('/admin/login', AdminController.login)

//market
app.post('/market/order', MarketController.placeOrder)
app.get('/market/data', MarketController.getMarketData)
app.post('/market/order-chooser', MarketController.orderChooser)
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});
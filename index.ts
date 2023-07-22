import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AdminController } from './controllers/admin.controller';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/admin/login', AdminController.login)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
import { Pool } from "pg"
import { ICheckLoginRequest } from "../types/ICheckLogin";

export class db {
    public static async query(query:string): Promise<any>{
        //const connectionString = 'postgres://mainAdmin:' + encodeURIComponent('(!$u@3#5EfRMj9g^:G') + '@localhost:5432/peanutbot';
        let res: ICheckLoginRequest = {
          email: "",
          password: ""
        }
        const pool = new Pool({
            user: 'mainAdmin',
            host: 'localhost',
            database: 'peanutbot',
            password: 'root',
            port: 5432,
            //connectionString: connectionString,
        })
        try {
            const client = await pool.connect()
        
            const result = await client.query(query)
            const item = result.rows
            res = item[0]
            client.release()
        
          } catch (err) {
            console.error('Error executing query', err)
          }
          return res
        
    }
}
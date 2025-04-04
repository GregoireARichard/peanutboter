import { Pool } from "pg"

export class db {
    public static async query(query:string): Promise<any>{
        let res: any
        const pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: 'localhost',
            database: 'peanutbot',
            password: process.env.POSTGRES_PASSWORD,
            port: 5432,
        })
        try {
            const client = await pool.connect()
        
            const result = await client.query(query)
            const item = result.rows
            res = item
            client.release()
        
          } catch (err) {
            console.error('Error executing query', err)
          }
          return res
        
    }
}
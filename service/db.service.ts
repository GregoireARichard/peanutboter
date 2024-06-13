import { Pool } from "pg"

export class db {
    public static async query(query:string): Promise<any>{
        let res: any
        const pool = new Pool({
            user: 'mainAdmin',
            host: 'localhost',
            database: 'peanutbot',
            password: 'root',
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
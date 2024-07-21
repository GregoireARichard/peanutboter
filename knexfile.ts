import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'peanutbot',
      user: process.env.POSTGRES_USER || 'mainAdmin',
      password: process.env.POSTGRES_PASSWORD || 'root'
    },
    migrations: {
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds'
    }
  },
};

export default config;

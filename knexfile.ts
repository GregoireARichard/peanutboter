import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'peanutbot',
      user: 'mainAdmin',
      password: 'root'
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

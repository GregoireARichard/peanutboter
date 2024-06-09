module.exports = {
    development: {
      client: 'postgresql',
      connection: {
        database: 'peanutbot',
        user: 'mainAdmin',
        password: 'root'
      },
      migrations: {
        directory: './migrations'
      }
    }
  };
  
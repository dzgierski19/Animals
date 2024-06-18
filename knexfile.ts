import * as dotenv from 'dotenv';
dotenv.config();
import type { Knex } from 'knex';
import * as path from 'path';

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      // insecureAuth: true,
      connectionString: process.env.DATABASE_URL,
    },
    migrations: {
      extension: 'ts',
      directory: path.resolve(__dirname, 'db', 'migrations'),
      tableName: 'migrations_history',
    },
    seeds: {
      extension: 'ts',
      directory: path.resolve(__dirname, 'db', 'seeds'),
    },
  },
  testing: {
    client: 'pg',
    connection: {
      // insecureAuth: true,
      connectionString: process.env.TEST_DATABASE_URL,
    },
    migrations: {
      extension: 'ts',
      directory: path.resolve(__dirname, 'db', 'migrations'),
      tableName: 'migrations_history',
    },
    seeds: {
      extension: 'ts',
      directory: path.resolve(__dirname, 'db', 'seeds'),
    },
  },
};

const configWithoutTest: Knex.Config = {
  client: 'pg',
  connection: {
    // insecureAuth: true,
    connectionString: process.env.DATABASE_URL,
  },
  migrations: {
    extension: 'ts',
    directory: path.resolve(__dirname, 'db', 'migrations'),
    tableName: 'migrations_history',
  },
  seeds: {
    extension: 'ts',
    directory: path.resolve(__dirname, 'db', 'seeds'),
  },
};

export default config;

/// dlaczego musialem zrobic export default config?

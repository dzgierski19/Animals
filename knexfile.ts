import type { Knex } from 'knex';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

// Update with your config settings.

// const config: { [key: string]: Knex.Config } = {
//   development: {
//     client: 'pg',
//     connection: {
//       connectionString: process.env['DATABASE_URL'],
//     },

//     migrations: {
//       directory: path.resolve(__dirname, 'db', 'migrations'),
//       tableName: 'knex_migrations',
//     },
//     seeds: {
//       directory: path.resolve(__dirname, 'db', 'seeds'),
//     },
//   },

//   staging: {
//     client: 'postgresql',
//     connection: {
//       connectionString: process.env['DATABASE_URL'],
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       directory: path.resolve(__dirname, 'db', 'migrations'),
//       tableName: 'knex_migrations',
//     },
//     seeds: {
//       directory: path.resolve(__dirname, 'db', 'seeds'),
//     },
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       connectionString: process.env['DATABASE_URL'],
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       directory: path.resolve(__dirname, 'db', 'migrations'),
//       tableName: 'knex_migrations',
//     },
//     seeds: {
//       directory: path.resolve(__dirname, 'db', 'seeds'),
//     },
//   },
// };

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
  },
  test: {
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
  },
};

const config2: Knex.Config = {
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

// export default config2;

//jesli jest środowisko testowe to wrzucic inny connectionString

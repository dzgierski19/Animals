import knex from 'knex';
import config from './../knexfile';

export const developmentDb = knex(config.development);
export const testDb = knex(config.testing);

export const closeKnex = () => {
  if (process.env.NODE_ENV === 'testing') {
    testDb.destroy();
  }
};

import knex from 'knex';
import config from './../knexfile';

export const developmentDb = knex(config.development);
export const testDb = knex(config.testing);

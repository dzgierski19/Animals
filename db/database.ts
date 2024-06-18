import knex, { Knex } from 'knex';
import config from './../knexfile';

export const developmentDb = knex(config.development);
export const testDb = knex(config.testing);

export const closeKnex = () => {
  if (process.env.NODE_ENV === 'testing') {
    testDb.destroy();
  }
};

export const clearDatabase = async () => {
  if (process.env.NODE_ENV === 'testing') {
    const tables = await listTablesForPG(testDb);
    // console.log(tables);
    tables.forEach(async (table) => {
      if (
        table !== 'migrations_history' &&
        table !== 'migrations_history_lock'
      ) {
        console.log(table);
        await testDb(table).truncate();
      }
    });
  }
};

export async function listTablesForPG(knex: Knex) {
  if (knex.client.constructor.name === 'Client_PG') {
    const query = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = current_schema()`;
    const results = await knex.raw(query);
    return results.rows.map((row) => row.table_name);
  }
}

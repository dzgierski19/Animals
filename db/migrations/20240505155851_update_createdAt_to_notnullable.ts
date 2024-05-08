import type { Knex } from 'knex';

const tableName = 'animals';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, function (table) {
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, function (table) {
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

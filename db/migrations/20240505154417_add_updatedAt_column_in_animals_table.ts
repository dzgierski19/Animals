import type { Knex } from 'knex';

const tableName = 'animals';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, function (table) {
    table.timestamp('updatedAt').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, function (table) {
    table.dropColumn('updatedAt');
  });
}

import type { Knex } from 'knex';

const tableName = 'animals';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, function (table) {
    table.string('id').primary().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, function (table) {
    table.dropPrimary();
  });
}

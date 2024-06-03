import type { Knex } from 'knex';

const tableName = 'animals';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

  await knex.schema.alterTable(tableName, function (table) {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).notNullable();
  });
  await knex.schema.alterTable(tableName, function (table) {
    table.dropColumn('id');
  });

  await knex.schema.alterTable(tableName, function (table) {
    table.renameColumn('new_id', 'id');
  });
  await knex.schema.alterTable(tableName, function (table) {
    table.primary(['id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, function (table) {
    table.dropPrimary();
    table.dropColumn('id');
  });
}

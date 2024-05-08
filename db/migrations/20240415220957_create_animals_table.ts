import { ANIMALTYPE } from './../../db/types';
import type { Knex } from 'knex';

const tableName = 'animals';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.string('id').defaultTo(knex.fn.uuid());
    table.string('name').notNullable();
    table.enum('type', Object.values(ANIMALTYPE)).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}

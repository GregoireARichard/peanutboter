import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  try {
    return knex.raw('ALTER TABLE accounts ADD COLUMN uuid VARCHAR(255)')
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
};

export async function down(knex: Knex): Promise<void> {
  try {
    return knex.raw('ALTER TABLE accounts DROP COLUMN uuid')
  } catch (error) {
    console.error('Error during rollback:', error);
    throw error;
  }
};

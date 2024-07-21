import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  try {
    return knex.raw('ALTER TABLE accounts RENAME COLUMN uuid TO coinbase_portfolio_id;')
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
};

export async function down(knex: Knex): Promise<void> {
  try {
    // write your rollback code here
  } catch (error) {
    console.error('Error during rollback:', error);
    throw error;
  }
};

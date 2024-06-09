import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  try {
    return knex.raw('SELECT * FROM admin WHERE email = ?', ['John Doe'])
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

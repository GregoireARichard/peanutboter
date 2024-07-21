import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  try {
    return knex.raw(`
      UPDATE accounts SET uuid = '62c0a443-49ad-5dc3-af63-4efecc8a0de1' WHERE name='passive_0';
      UPDATE accounts SET uuid = '606872d9-d913-431d-ae57-cf846d6b814a' WHERE name='active_0';
      UPDATE accounts SET uuid = '606fbc73-2d69-46b4-a7b7-c2aa443ee009' WHERE name='active_1';
      UPDATE accounts SET uuid = '1fad9ea1-8e1c-4391-8729-303a1b793302' WHERE name='active_2';
      `)
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
};

export async function down(knex: Knex): Promise<void> {
  try {
    return knex.raw('')
  } catch (error) {
    console.error('Error during rollback:', error);
    throw error;
  }
};

import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('snacks', (table) => {
        table.uuid('id_snack').primary()
        table.string('name').notNullable()
        table.string('description').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.enum('diet', ['yes', 'no'])

        table.uuid('session_id')
        table.foreign('session_id').references('users.id')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('snacks')
}


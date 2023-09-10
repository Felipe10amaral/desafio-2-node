import { knex } from "../../database"

export async function list() {
    const users = await knex('users').select('*')

    return {users}
}
import { knex } from "../../database";

export async function list() {
    const snacks = await knex('snacks').select('*')

    return {snacks}
}
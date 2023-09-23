import { randomUUID } from 'crypto'
import { knex } from '../database'

interface ISnacks {
  name: string
  description: string
  created_at: string
  diet: string
  session_id: string
}

class SnackRepository {
  async create({ name, description, created_at, diet, session_id }: ISnacks) {
    await knex('snacks').insert({
      id_snack: randomUUID(),
      name,
      description,
      created_at,
      diet,
      session_id,
    })
  }

  async list() {
    const snacks = await knex('snacks').select('*').returning('*')
    return snacks
  }

  async delete(id: string) {
    await knex('snacks').delete().where({ id_snack: id })
  }
}

export default new SnackRepository()

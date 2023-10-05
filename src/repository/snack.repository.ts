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

  async listOne(id: string) {
    const snacks = await knex('snacks').select().where({ id_snack: id }).first()
    return snacks
  }

  async delete(id: string) {
    await knex('snacks').delete().where({ id_snack: id })
  }

  async edit(id: string, newSnack: Partial<ISnacks>) {
    const update = await knex('snacks').where({ id_snack: id }).update(newSnack)

    if (update > 0) {
      console.log('Atualizado com sucesso')
      return 1
    } else {
      console.log('Nenhum registro foi atualizado com o ID especificado.')
      return 0
    }
  }
}

export default new SnackRepository()

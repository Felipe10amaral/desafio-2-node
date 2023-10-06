import { randomUUID } from 'crypto'
import { knex } from '../database'

interface ISnacks {
  name: string
  description: string
  created_at: string
  diet: string
  session_id: string
}

interface IMetrics {
  total: number
  inDiet: number
  offDiet: number
  maxSequence: number
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

  async listSancksPerOneUser(id: string) {
    const snacks = await knex('snacks')
      .select('name', 'description', 'diet', 'snacks.session_id')
      .where('session_id', id)
      .returning('*')

    return snacks
  }

  async metrics(id: string): Promise<IMetrics> {
    const [totalSnacks] = await knex('snacks')
      .count('name')
      .where('session_id', id)

    const total = +totalSnacks['count(`name`)'] || 0

    const [totalInDiet] = await knex('snacks')
      .count('diet as DietCount')
      .where('session_id', id)
      .where('diet', 'yes')

    const inDiet = +totalInDiet['DietCount'] || 0

    const [totalOffDiet] = await knex('snacks')
      .count('diet as DietCount')
      .where('session_id', id)
      .where('diet', 'no')

    const offDiet = +totalOffDiet['DietCount'] || 0

    const snackSequences = await knex('snacks')
      .select('diet')
      .where('session_id', id)

    let cont = 0
    let maxSequence = 0

    for (const sequence of snackSequences) {
      if (sequence.diet === 'yes') {
        cont++
        maxSequence = Math.max(maxSequence, cont)
      } else {
        cont = 0
      }
    }

    const metricsSnack = { total, inDiet, offDiet, maxSequence }
    return metricsSnack
  }
}

export default new SnackRepository()

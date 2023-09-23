import { randomUUID } from 'crypto'
import { knex } from '../database'

interface IUser {
  name: string
  password: string
}
class UserRepository {
  async create({ name, password }: IUser) {
    await knex('users').insert({
      id: randomUUID(),
      name,
      password,
    })
  }

  async list() {
    const users = await knex('users').select('*').returning('*')
    return users
  }
}

export default new UserRepository()

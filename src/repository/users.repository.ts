import { randomUUID } from 'crypto'
import { knex } from '../database'

export interface IUser {
  id?: string
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

  async listOneUser(name: string): Promise<{ user: IUser | null }> {
    const user: IUser | null = await knex('users')
      .select()
      .where('name', name)
      .first()

    return { user }
  }

  async delete(id: string) {
    await knex('users').delete().where({ id })
  }

  async listUserId(id: string) {
    const user: IUser | null = await knex('users')
      .select()
      .where('id', id)
      .first()

    return user
  }
}

export default new UserRepository()

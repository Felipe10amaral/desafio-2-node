import 'dotenv/config'
import { knex as knexSetup, Knex } from 'knex'

console.log(process.env)

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db/app.db',
  },
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = knexSetup(config)

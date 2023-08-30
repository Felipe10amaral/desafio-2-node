import { knex as knexSetup, Knex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
  migrations: {
    extension: 'ts',
    directory: './db',
  },
}

export const knex = knexSetup(config)

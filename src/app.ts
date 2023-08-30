import fastify from 'fastify'
import { snackRouter } from './routes'

export const app = fastify()

app.register(snackRouter)

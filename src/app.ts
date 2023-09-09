import fastify from 'fastify'
import { usersRoutes } from './users/routes'


export const app = fastify()

app.register(usersRoutes)



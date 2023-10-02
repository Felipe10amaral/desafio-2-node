import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { usersRoutes } from './routes/userRoutes'
import { snacksRoutes } from './routes/snackRoutes'

export const app = fastify()

app.register(cookie)

app.register(usersRoutes)
app.register(snacksRoutes)

import fastify from 'fastify'
import cookies from '@fastify/cookie'
import { usersRoutes } from './routes/userRoutes'
import { snacksRoutes } from './routes/snackRoutes'

export const app = fastify()

app.register(cookies)

app.register(usersRoutes)
app.register(snacksRoutes)

import fastify from 'fastify'
import { usersRoutes } from './routes/userRoutes'
import { snacksRoutes } from './routes/snackRoutes'


export const app = fastify()

app.register(usersRoutes)
app.register(snacksRoutes)
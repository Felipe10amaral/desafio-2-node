import fastify from 'fastify'
import { usersRoutes } from './useCases/users/routes'
import { snacksRoutes } from './useCases/snacks/routes'


export const app = fastify()

app.register(usersRoutes)
app.register(snacksRoutes)



import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import snackServices from '../services/snacks/snack.services'
import { authorization } from '../middleware/authorization'

export async function snacksRoutes(app: FastifyInstance) {
  app.post(
    '/snacks',
    { preHandler: [authorization] },
    (request: FastifyRequest, reply: FastifyReply) => {
      snackServices.create(request, reply)
    },
  )

  app.get(
    '/snacks',
    { preHandler: [authorization] },
    (request: FastifyRequest, reply: FastifyReply) => {
      snackServices.list(request, reply)
    },
  )

  app.get(
    '/snacks/:id',
    { preHandler: [authorization] },
    (request: FastifyRequest, reply: FastifyReply) => {
      snackServices.listSnacksPerUsers(request, reply)
    },
  )

  app.get('/snack/:id', (request: FastifyRequest, reply: FastifyReply) => {
    snackServices.listOne(request, reply)
  })

  app.delete('/snack/:id', (request: FastifyRequest, reply: FastifyReply) => {
    snackServices.delete(request, reply)
  })

  app.put('/snack/:id', (request: FastifyRequest, reply: FastifyReply) => {
    snackServices.update(request, reply)
  })

  app.get('/summary/:id', (request: FastifyRequest, reply: FastifyReply) => {
    snackServices.metrics(request, reply)
  })
}

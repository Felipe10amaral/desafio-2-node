import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import snackServices from '../services/snacks/snack.services'

export async function snacksRoutes(app: FastifyInstance) {
  app.post('/snacks', (request: FastifyRequest, reply: FastifyReply) => {
    snackServices.create(request, reply)
  })

  app.get('/snacks', (request: FastifyRequest, reply: FastifyReply) => {
    snackServices.list(request, reply)
  })

  app.get('/snacks/:id', (request: FastifyRequest, reply: FastifyReply) => {
    snackServices.listOne(request, reply)
  })

  app.delete('/snacks/:id', (request: FastifyRequest, reply: FastifyReply) => {
    snackServices.delete(request, reply)
  })

  app.put('/snacks/:id', (request: FastifyRequest, reply: FastifyReply) => {
    snackServices.update(request, reply)
  })
}

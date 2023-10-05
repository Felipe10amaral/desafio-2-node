import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import userServices from '../services/users/user.services'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', (request: FastifyRequest, reply: FastifyReply) => {
    userServices.create(request, reply)
  })
  app.get('/users', (request: FastifyRequest, reply: FastifyReply) => {
    userServices.list(request, reply)
  })

  app.post('/login', (request: FastifyRequest, reply: FastifyReply) => {
    userServices.login(request, reply)
  })

  app.delete('/user/:id', (request: FastifyRequest, reply: FastifyReply) => {
    userServices.delete(request, reply)
  })
}

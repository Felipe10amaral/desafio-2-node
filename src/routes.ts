import { FastifyInstance } from 'fastify'

export async function snackRouter(app: FastifyInstance) {
  app.get('/', (request, reply) => {
    const desafio = 'pronto'

    return reply.status(200).send(desafio)
  })
}

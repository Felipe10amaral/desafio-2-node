import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkInExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionID = request.cookies.session_id

  if (!sessionID) {
    return reply.status(401).send({ error: 'Unauthorized checkin' })
  }
}

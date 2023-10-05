import { env } from '../env'
import { verify } from 'jsonwebtoken'

const secret_JWT = env.JWT_SECRET

export async function authorization(request, reply) {
  const token = request.headers.authorization

  if (!token) {
    return reply.status(401).send({ error: 'unauthorized' })
  }

  const tokenSplited = token.split('Bearer ')

  const decoded = verify(tokenSplited[1], secret_JWT)

  if (!decoded) {
    return reply.status(401).send({ error: 'unauthorized' })
  }

  request.user = decoded
}

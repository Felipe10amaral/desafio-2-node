import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import userRepository from '../../repository/users.repository'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { env } from '../../env'

const secret_JWT = env.JWT_SECRET

class UserServices {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const userSchemaBody = z.object({
      name: z.string(),
      password: z.string(),
    })

    const user = userSchemaBody.parse(request.body)

    if (user.password) {
      user.password = await hash(user.password, 6)
    }

    try {
      await userRepository.create(user)
    } catch (error) {
      return reply.status(400).send(error)
    }

    return reply.status(201).send()
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await userRepository.list()
      return reply.status(200).send(users)
    } catch (error) {
      return reply.status(400).send(error)
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const credentials = z.object({
      name: z.string(),
      password: z.string(),
    })

    const { name, password } = credentials.parse(request.body)

    const userBD = await userRepository.listOneUser(name)

    const user = userBD.user

    if (!user) {
      return reply.status(404).send({ message: 'user not found' })
    }

    const comparation = await compare(password, user.password)

    if (comparation) {
      const token = sign({ name: user.name, id: user.id }, secret_JWT, {
        expiresIn: '7d',
      })

      return reply.status(200).send({ user, token })
    }

    return reply.status
  }

  async delete(request, reply) {
    const { id } = request.params as { id: string }

    try {
      await userRepository.delete(id)
      return reply.status(204).send({ message: ' user deleted' })
    } catch (error) {
      return reply.status(400).send({ error: 'error' })
    }
  }
}

export default new UserServices()

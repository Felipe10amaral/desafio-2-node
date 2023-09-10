import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import userRepository from '../../repository/users.repository'

class UserServices {
    async create(request: FastifyRequest, reply: FastifyReply) {

        const userSchemaBody = z.object({
            name: z.string(),
            password: z.string().min(6)
        })

        const user = userSchemaBody.parse(request.body)

        try {
            await userRepository.create(user)
        } catch (error) {
            return reply.status(400).send(error)
        }

        return reply.status(201).send()

    }

    async list(request: FastifyRequest, reply: FastifyReply){

        try {
            const users = await userRepository.list()
            return reply.status(200).send(users)
            
        } catch (error) {
            return reply.status(400).send(error)
        }
    }
}

export default new UserServices()
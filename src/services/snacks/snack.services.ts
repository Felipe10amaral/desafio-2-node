import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import snackRepository from "../../repository/snack.repository";

class Snack {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const snackBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            created_at: z.string(),
            diet: z.string(),
            session_id: z.string()
        })

        const { name, description, created_at, diet, session_id } = snackBodySchema.parse(request.body)
        
        try {
            snackRepository.create({name, description, created_at, diet, session_id})
        } catch (error) {
            return reply.status(400).send(error)
        }
        
        return reply.status(201).send()
    }
    
    async list(request: FastifyRequest, reply: FastifyReply) {
        try {
            const snacks = await snackRepository.list()
            return reply.status(200).send(snacks)

        } catch (error) {
            return reply.status(400).send(error)
        }

    }
}

export default new Snack()
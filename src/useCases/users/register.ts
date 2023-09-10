import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import {knex} from "../../database";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        password: z.string().min(6)
    })

    const {name, password} = registerBodySchema.parse(request.body)

    try {
        await knex('users').insert({
            id: randomUUID(),
            name,
            password
        })

    } catch (error) {
        return reply.status(400).send(error)
    }

    return reply.status(201).send()

}
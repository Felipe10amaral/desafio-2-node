import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { knex } from "../../database";

export async function register(request: FastifyRequest, reply: FastifyReply) {

    const snackBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        created_at: z.string(),
        diet: z.string(),
        session_id: z.string()
    })

    const { name, description, created_at, diet, session_id } = snackBodySchema.parse(request.body)

    try {
        await knex('snacks').insert({
            id_snack: randomUUID(),
            name,
            description,
            created_at,
            diet,
            session_id
        })
    } catch (error) {
        return reply.status(400).send(error)
    }

    return reply.status(201).send()

}
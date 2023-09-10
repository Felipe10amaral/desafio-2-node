import { FastifyInstance } from "fastify";
import { register } from "./register";
import { list } from "./list";

export async function snacksRoutes(app: FastifyInstance) {

    app.post('/snacks', register)
    app.get('/snacks', list)
}
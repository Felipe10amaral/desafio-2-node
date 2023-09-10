import { FastifyInstance } from "fastify";
import { register } from "./register";
import { list } from "./list";

export async function usersRoutes(app: FastifyInstance) {

    app.post('/users', register)
    app.get('/users', list)
    

}
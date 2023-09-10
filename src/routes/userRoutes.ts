import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import userServices from "../services/users/user.services";


export async function usersRoutes(app: FastifyInstance) {

    app.post('/users', (request:FastifyRequest, reply:FastifyReply) => {
        userServices.create(request, reply)

    })
    app.get('/users', (request: FastifyRequest, reply: FastifyReply) => {
        userServices.list(request, reply)
    })
    

}
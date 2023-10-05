import { z } from 'zod'
import snackRepository from '../../repository/snack.repository'
import { ISnack } from '../../model/ISnack'

interface RequestBody {
  id_snack: string
  name: string
  description: string
  created_at: string
  diet: string
}

function validatedUpdated(snack: ISnack) {
  const updateSnack = z.object({
    name: z.string(),
    description: z.string(),
    created_at: z.string(),
    diet: z.string(),
  })

  const newSnack = updateSnack.parse(snack)
  return newSnack
}

class Snack {
  async create(request, reply) {
    const snackBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      created_at: z.string(),
      diet: z.string(),
    })

    const { name, description, created_at, diet } = snackBodySchema.parse(
      request.body,
    )

    const userID = request.user.id

    try {
      snackRepository.create({
        name,
        description,
        created_at,
        diet,
        session_id: userID,
      })
    } catch (error) {
      return reply.status(400).send(error)
    }

    return reply.status(201).send()
  }

  async list(request, reply) {
    try {
      const snacks = await snackRepository.list()
      return reply.status(200).send(snacks)
    } catch (error) {
      return reply.status(400).send(error)
    }
  }

  async delete(request, reply) {
    const { id } = request.params as { id: string }

    console.log(id)

    try {
      await snackRepository.delete(id)
      return reply.status(204).send()
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  async update(request, reply) {
    const { name, description, created_at, diet } = request.body as RequestBody
    const { id } = request.params as { id: string }

    console.log(id)

    const snack = {
      name,
      description,
      created_at,
      diet,
    }

    const newSnack = validatedUpdated(snack)
    const result = await snackRepository.edit(id, newSnack)

    if (result) {
      return reply.status(204).send({ message: 'atualizado' })
    } else {
      return reply.status(400).send({ message: 'Erro ao atualizar' })
    }
  }

  async listOne(request, reply) {
    const { id } = request.params as { id: string }

    try {
      const snack = await snackRepository.listOne(id)
      return reply.status(200).send(snack)
    } catch (error) {
      return reply.status(400).send(error)
    }
  }
}

export default new Snack()

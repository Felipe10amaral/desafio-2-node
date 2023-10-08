import { z } from 'zod'
import snackRepository from '../../repository/snack.repository'
import { ISnack } from '../../model/ISnack'

interface RequestBody {
  id_snack: string
  name: string
  description: string
  created_at: string
  diet: string
  session_id: string
}

function validatedUpdated(snack: ISnack) {
  const updateSnack = z.object({
    name: z.string(),
    description: z.string(),
    created_at: z.string(),
    diet: z.string(),
    session_id: z.string(),
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
    const { IDsnack } = request.params as { IDsnack: string }

    const { id: idUser } = request.user

    const snack = await snackRepository.listOne(IDsnack)

    if (!snack) {
      return reply.status(400).send({ error: 'refeicao nao encontrada' })
    }

    if (snack.session_id !== idUser) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    try {
      await snackRepository.delete(IDsnack)
      return reply.status(204).send()
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  async update(request, reply) {
    const { name, description, created_at, diet } = request.body as RequestBody
    const { id } = request.params as { id: string }

    const { id: idUser } = request.user

    const snacks = await snackRepository.listOne(id)

    if (!snacks) {
      return reply.status(400).send({ error: 'refeicao nao encontrada' })
    }

    const session_id = snacks.session_id

    if (session_id !== idUser) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    const snack = {
      name,
      description,
      created_at,
      diet,
      session_id,
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
    const { id: idUser } = request.user

    const snacks = await snackRepository.listOne(id)

    if (!snacks) {
      return reply.status(400).send({ error: 'refeicao nao encontrada' })
    }

    console.log(snacks)
    console.log(snacks.session_id)

    if (snacks.session_id !== idUser) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    try {
      const snack = await snackRepository.listOne(id)
      return reply.status(200).send(snack)
    } catch (error) {
      return reply.status(400).send(error)
    }
  }

  async listSnacksPerUsers(request, reply) {
    const { id } = request.params as { id: string }

    try {
      const snackPerUser = await snackRepository.listSancksPerOneUser(id)
      return reply.status(200).send(snackPerUser)
    } catch (error) {
      return reply.status(400).send({ error: 'user not snacks' })
    }
  }

  async metrics(request, reply) {
    const { id } = request.params as { id: string }

    try {
      const summary = await snackRepository.metrics(id)
      return reply.status(200).send(summary)
    } catch (error) {
      return reply.status(400).send(error)
    }
  }
}

export default new Snack()

import { fastify } from "fastify"
import { DatabaseMemory } from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

/*
server.get("/", () => {
  return "Olá Mundo!"
})
*/

server.post("/usuario", (request, reply) => {
  const { email, senha, telefone } = request.body
  database.create({
    email: email,
    senha: senha,
    telefone: telefone,
  })
  console.log(database.list())
  return reply.status(201).send()
})

server.get("/usuario", (request) => {
  const search = request.query.search

  console.log(search)

  const usuarios = database.list(search)

  return usuarios
})

server.put("/usuario/:id", (request, reply) => {
  const usuarioId = request.params.id
  const { email, senha, telefone } = request.body
  const usuario = database.update(usuarioId, {
    email,
    senha,
    telefone,
  })
  return reply.status(204).send()
})

server.delete("/usuario/:id", (request, reply) => {
  const usuarioId = request.params.id

  database.delete(usuarioId)

  return reply.status(204).send()
})

server.listen({
  port: 3333,
})

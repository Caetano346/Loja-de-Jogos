import { randomUUID } from "crypto"

export class DatabaseMemory {
  #usuarios = new Map()

  list(search) {
    return Array.from(this.#usuarios.entries())
      .map((usuarioArray) => {
        const id = usuarioArray[0]

        const data = usuarioArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((usuario) => {
        if (search) {
          return usuario.email.includes(search)
        }
        return true
      })
  }

  create(usuario) {
    const usuarioId = randomUUID()
    this.#usuarios.set(usuarioId, usuario)
  }

  update(id, usuario) {
    this.#usuarios.set(id, usuario)
  }

  delete(id, usuario) {
    this.#usuarios.delete(id, usuario)
  }
}

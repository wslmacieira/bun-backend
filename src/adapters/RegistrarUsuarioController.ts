import Elysia from "elysia";
import RegistrarUsuario from "../core/usuario/service/RegistrarUsuario";

export default class RegistrarUsuarioController {
  constructor(
    readonly servidor: Elysia,
    readonly casoDeUso: RegistrarUsuario
  ) {
    servidor.post('/usuarios', async (handler) => {
      const { nome, email, senha } = handler.body as any

      await casoDeUso.executar({ nome, email, senha })
      handler.set.status = 201
      return {
        status: 201,
        body: {
          mensagem: "Usuário criado com sucesso"
        }
      }
    })
  }
}
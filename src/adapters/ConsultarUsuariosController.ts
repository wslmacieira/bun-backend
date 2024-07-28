import Elysia from "elysia";
import ConsultarUsuarios from "../core/usuario/service/ConsultarUsuarios";

export default class ConsultarUsuariosController {
  constructor(
    readonly servidor: Elysia,
    readonly casoDeUso: ConsultarUsuarios
  ) {
    servidor.get('/usuarios', async (handler) => {
      return casoDeUso.executar()
    })
  }
}
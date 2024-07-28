import Elysia from "elysia";
import ConsultarUsuarioPorId from "../core/usuario/service/ConsultarUsuarioPorId";
import { createReadableStream } from "../core/shared/streams/create-readable-stream";
import { createPipelineStream } from "../core/shared/streams/pipeline-stream";
import ConsultarUsuarios from "../core/usuario/service/ConsultarUsuarios";
import ConsultarTodoPorId from "../core/shared/streams/ConsultarTodoPorId";

export default class ConsultarUsuariosPorIdController {
  constructor(
    readonly servidor: Elysia,
    readonly casoDeUso: ConsultarUsuarioPorId
  ) {
    servidor.get('/usuarios/:id', async ({ params }) => {
      const data = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        title: `title ${i + 1}`,
        completed: i % 2 === 0
      }));

      const todoService = new ConsultarTodoPorId()

      const response = await createPipelineStream({
        data: data.map(({ id }) => id),
        service: todoService
      })
        .execute({ batchSize: 20, delay: 1000 })
      console.log("response: ", response)

      return casoDeUso.executar(+params.id)
    })
  }
}
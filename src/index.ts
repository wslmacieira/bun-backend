import ConsultarUsuariosController from "./adapters/ConsultarUsuariosController";
import ConsultarUsuariosPorIdController from "./adapters/ConsultarUsuariosPorIdController";
import RegistrarUsuarioController from "./adapters/RegistrarUsuarioController";
import ConsultarUsuarioPorId from "./core/usuario/service/ConsultarUsuarioPorId";
import ConsultarUsuarios from "./core/usuario/service/ConsultarUsuarios";
import RegistrarUsuario from "./core/usuario/service/RegistrarUsuario";
import app from "./external/api/config";
import RepositorioUsuarioPrisma from "./external/prisma/RepositorioUsuarioPrisma";

const repositorioUsuario = new RepositorioUsuarioPrisma()

const registrarUsuario = new RegistrarUsuario(repositorioUsuario)
new RegistrarUsuarioController(app, registrarUsuario)

const consultarUsuarios = new ConsultarUsuarios(repositorioUsuario)
new ConsultarUsuariosController(app, consultarUsuarios)

const consultarUsuarioPorId = new ConsultarUsuarioPorId(repositorioUsuario)
new ConsultarUsuariosPorIdController(app, consultarUsuarioPorId)

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

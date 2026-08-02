import { RouteGenericInterface } from "fastify";
import { QueryBuscarUsuarios } from "../../routes/usuario/schemas/buscar-usuarios.schema";
import { ConteudoCriarUsuario } from "../../routes/usuario/schemas/criar-usuario.schema";
import { ParamsUsuarioId } from "../../routes/usuario/schemas/buscar-usuario-por-id.schema";
import { ConteudoEditarUsuario } from "../../routes/usuario/schemas/editar-usuario.schema";

export interface BuscarUsuarioPorIdRoute extends RouteGenericInterface {
  Params: ParamsUsuarioId;
}
export interface BuscarUsuariosRoute extends RouteGenericInterface {
  Querystring: QueryBuscarUsuarios;
}

export interface CriarUsuarioRoute extends RouteGenericInterface {
  Body: ConteudoCriarUsuario;
}

export interface EditarUsuarioRoute extends RouteGenericInterface {
  Params: ParamsUsuarioId;
  Body: ConteudoEditarUsuario;
}

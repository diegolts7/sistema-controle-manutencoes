import { RouteGenericInterface } from "fastify";
import { QueryBuscarUsuarios } from "../../routes/usuario/schemas/buscar-usuarios.schema";
import { BodyCriarUsuario } from "../../routes/usuario/schemas/criar-usuario.schema";

export interface BuscarUsuariosRoute extends RouteGenericInterface {
  Querystring: QueryBuscarUsuarios;
}

export interface CriarUsuarioRoute extends RouteGenericInterface {
  Body: BodyCriarUsuario;
}

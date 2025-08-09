import { RouteGenericInterface } from "fastify";
import { ConteudoLogin } from "../../routes/autenticacao/schemas/login.schema";
import { ConteudoVerificarToken } from "../../routes/autenticacao/schemas/verificar-token.schema";
import { ConteudoAtualizarToken } from "../../routes/autenticacao/schemas/atualizar-token.schema";

export interface LoginRoute extends RouteGenericInterface {
  Body: ConteudoLogin;
}

export interface VerificarTokenRoute extends RouteGenericInterface {
  Body: ConteudoVerificarToken;
}

export interface AtualizarTokenRoute extends RouteGenericInterface {
  Body: ConteudoAtualizarToken;
}

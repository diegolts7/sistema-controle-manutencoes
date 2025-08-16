import { RouteGenericInterface } from "fastify";
import { ConteudoCriarManutencao } from "../../routes/manutencao/schemas/criar-manutencao.schema";

export interface CriarManutencaoRoute extends RouteGenericInterface {
  Body: ConteudoCriarManutencao;
}

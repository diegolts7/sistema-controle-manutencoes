import { RouteGenericInterface } from "fastify";
import { ConteudoCriarManutencao } from "../../routes/manutencao/schemas/criar-manutencao.schema";
import { QueryParamsBuscarManutencoes } from "../../routes/manutencao/schemas/buscar-manutencoes.schema";
import { ParamsIdNumber } from "../../routes/manutencao/schemas/buscar-manutencao-por-id.schema";

export interface CriarManutencaoRoute extends RouteGenericInterface {
  Body: ConteudoCriarManutencao;
}

export interface BuscarManutencoesRoute extends RouteGenericInterface {
  Querystring: QueryParamsBuscarManutencoes;
}

export interface BuscarManutencaoPorIdRoute extends RouteGenericInterface {
  Params: ParamsIdNumber;
}

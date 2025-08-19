import { RouteGenericInterface } from "fastify";
import { ConteudoCriarManutencao } from "../../routes/manutencao/schemas/criar-manutencao.schema";
import { QueryParamsBuscarManutencoes } from "../../routes/manutencao/schemas/buscar-manutencoes.schema";
import { ParamsIdNumber } from "../../routes/manutencao/schemas/buscar-manutencao-por-id.schema";
import {
  ConteudoEditarManutencaoCoordenador,
  ConteudoEditarManutencaoProfessor,
} from "../../routes/manutencao/schemas/editar-manutencao.schema";
import { ConteudoConcluirManutencao } from "../../routes/manutencao/schemas/concluir-manutencao.schema";

export interface CriarManutencaoRoute extends RouteGenericInterface {
  Body: ConteudoCriarManutencao;
}

export interface BuscarManutencoesRoute extends RouteGenericInterface {
  Querystring: QueryParamsBuscarManutencoes;
}

export interface ParamsIdRoute extends RouteGenericInterface {
  Params: ParamsIdNumber;
}

export interface EditarManutencaoRoute extends ParamsIdRoute {
  Body: ConteudoEditarManutencaoCoordenador | ConteudoEditarManutencaoProfessor;
}

export interface ConcluirManutencaoRoute extends ParamsIdRoute {
  Body: ConteudoConcluirManutencao;
}

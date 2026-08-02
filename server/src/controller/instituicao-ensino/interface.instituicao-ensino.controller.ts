import { RouteGenericInterface } from "fastify";
import {
  InstituicaoEnsinoDTO,
  InstituicaoEnsinoUpdateDTO,
  ParamsInstituicaoId,
} from "../../routes/instituicao-ensino/schemas/instituicao-ensino.schema";

export interface CriarInstituicaoRoute extends RouteGenericInterface {
  Body: InstituicaoEnsinoDTO;
}

export interface BuscarIntituicaoPorIdRoute extends RouteGenericInterface {
  Params: ParamsInstituicaoId;
}

export interface AtualizarInstituicaoRoute extends BuscarIntituicaoPorIdRoute {
  Body: InstituicaoEnsinoUpdateDTO;
}

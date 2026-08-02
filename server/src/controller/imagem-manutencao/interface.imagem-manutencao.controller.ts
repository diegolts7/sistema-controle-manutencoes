import { RouteGenericInterface } from "fastify";
import { ParamsIdImagem } from "../../routes/imagem-manutencao/schemas/atualizar-imagem.schema";

export interface ParamsIdImagemManutencaoRoute extends RouteGenericInterface {
  Params: ParamsIdImagem;
}

import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { instituicaoEnsinoController } from "../../controller/instituicao-ensino/instituicao-ensino.controller";
import {
  atualizarInstituicaoSchema,
  buscarInstituicaoSchema,
  criarInstituicaoSchema,
  deletarInstituicaoSchema,
  listarInstituicoesSchema,
} from "./schemas/instituicao-ensino.schema";

export const instituicaoEnsinoRotas = (app: FastifyTypedInstance) => {
  app.post(
    "/",
    { schema: criarInstituicaoSchema },
    instituicaoEnsinoController.criar
  );

  app.get(
    "/",
    { schema: listarInstituicoesSchema },
    instituicaoEnsinoController.listar
  );

  app.get(
    "/:id",
    { schema: buscarInstituicaoSchema },
    instituicaoEnsinoController.buscarPorId
  );

  app.put(
    "/:id",
    { schema: atualizarInstituicaoSchema },
    instituicaoEnsinoController.atualizar
  );

  app.delete(
    "/:id",
    { schema: deletarInstituicaoSchema },
    instituicaoEnsinoController.deletar
  );
};
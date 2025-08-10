import { CargoEnum } from "@prisma/client";
import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { instituicaoEnsinoController } from "../../controller/instituicao-ensino/instituicao-ensino.controller";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { verificarCargoMiddleware } from "../../middlewares/cargo/verificar-cargo.middleware";
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
    {
      schema: criarInstituicaoSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware([CargoEnum.COORDENADOR]),
      ],
    },
    instituicaoEnsinoController.criar
  );

  app.get(
    "/",
    { schema: listarInstituicoesSchema, preHandler: [tokenValidoMiddleware] },
    instituicaoEnsinoController.listar
  );

  app.get(
    "/:id",
    { schema: buscarInstituicaoSchema, preHandler: [tokenValidoMiddleware] },
    instituicaoEnsinoController.buscarPorId
  );

  app.patch(
    "/:id",
    {
      schema: atualizarInstituicaoSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware([CargoEnum.COORDENADOR]),
      ],
    },
    instituicaoEnsinoController.atualizar
  );

  app.delete(
    "/:id",
    {
      schema: deletarInstituicaoSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware([CargoEnum.COORDENADOR]),
      ],
    },
    instituicaoEnsinoController.deletar
  );
};

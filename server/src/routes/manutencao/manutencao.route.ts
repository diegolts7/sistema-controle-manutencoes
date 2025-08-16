import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { manutencaoController } from "../../controller/manutencao/manutencao.controller";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { verificarCargoMiddleware } from "../../middlewares/cargo/verificar-cargo.middleware";
import { criarManutencaoSchema } from "./schemas/criar-manutencao.schema";

export const manutencaoRotas = (app: FastifyTypedInstance) => {
  app.post(
    "/",
    {
      schema: criarManutencaoSchema,
      preHandler: [tokenValidoMiddleware],
    },
    manutencaoController.solicitar
  );

  app.get(
    "/",
    {
      schema: {},
      preHandler: [tokenValidoMiddleware],
    },
    () => {}
  );

  app.get(
    "/prazo",
    {
      schema: {},
      preHandler: [tokenValidoMiddleware],
    },
    () => {}
  );

  app.get(
    "/:idManutencao",
    {
      schema: {},
      preHandler: [tokenValidoMiddleware],
    },
    () => {}
  );

  app.get(
    "/laboratorio/:idLaboratorio",
    {
      schema: {},
      preHandler: [tokenValidoMiddleware],
    },
    () => {}
  );

  app.get(
    "/tecnico/:idTecnico",
    {
      schema: {},
      preHandler: [tokenValidoMiddleware],
    },
    () => {}
  );

  app.get(
    "/para-tecnico",
    {
      schema: {},
      preHandler: [tokenValidoMiddleware],
    },
    () => {}
  );

  app.get(
    "/criadas",
    {
      schema: {},
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR", "PROFESSOR"]),
      ],
    },
    () => {}
  );

  app.patch(
    "/:id",
    {
      schema: {},
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR"]),
      ],
    },
    () => {}
  );

  app.patch(
    "/concluir-manutencao/:id",
    {
      schema: {},
      preHandler: [tokenValidoMiddleware],
    },
    () => {}
  );

  app.patch(
    "/cancelar/:id",
    {
      schema: {},
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR"]),
      ],
    },
    () => {}
  );
};

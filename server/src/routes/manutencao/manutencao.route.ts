import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { manutencaoController } from "../../controller/manutencao/manutencao.controller";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { verificarCargoMiddleware } from "../../middlewares/cargo/verificar-cargo.middleware";
import { buscarManutencaoPorIdSchema } from "./schemas/buscar-manutencao-por-id.schema";
import { buscarManutencaoParaTecnicoSchema } from "./schemas/buscar-manutencoes-para-tecnico.schema";
import { buscarManutencoesSolicitadasSchema } from "./schemas/buscar-manutencoes-solicitadas.schema";
import { buscarManutencaoSchema } from "./schemas/buscar-manutencoes.schema";
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
      schema: buscarManutencaoSchema,
      preHandler: [tokenValidoMiddleware],
    },
    manutencaoController.buscar
  );

  app.get(
    "/:idManutencao",
    {
      schema: buscarManutencaoPorIdSchema,
      preHandler: [tokenValidoMiddleware],
    },
    manutencaoController.buscarPorId
  );

  // app.get(
  //   "/laboratorio/:idLaboratorio",
  //   {
  //     schema: {},
  //     preHandler: [tokenValidoMiddleware],
  //   },
  //   () => {}
  // );

  // app.get(
  //   "/tecnico/:idTecnico",
  //   {
  //     schema: {},
  //     preHandler: [tokenValidoMiddleware],
  //   },
  //   () => {}
  // );

  app.get(
    "/tecnico",
    {
      schema: buscarManutencaoParaTecnicoSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["TECNICO"]),
      ],
    },
    manutencaoController.buscarParaTecnico
  );

  app.get(
    "/solicitadas",
    {
      schema: buscarManutencoesSolicitadasSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR", "PROFESSOR"]),
      ],
    },
    manutencaoController.buscarSolicitadas
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
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR", "TECNICO"]),
      ],
    },
    () => {}
  );

  app.patch(
    "/cancelar/:id",
    {
      schema: {},
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR", "PROFESSOR"]),
      ],
    },
    () => {}
  );
};

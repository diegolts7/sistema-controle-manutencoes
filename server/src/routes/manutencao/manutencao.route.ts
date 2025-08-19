import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { manutencaoController } from "../../controller/manutencao/manutencao.controller";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { verificarCargoMiddleware } from "../../middlewares/cargo/verificar-cargo.middleware";
import { buscarManutencaoPorIdSchema } from "./schemas/buscar-manutencao-por-id.schema";
import { buscarManutencaoRelacionadasAoUsuarioSchema } from "./schemas/buscar-manutencoes-relacionadas-usuario.schema";
import { buscarManutencaoSchema } from "./schemas/buscar-manutencoes.schema";
import { concluirManutencaoSchema } from "./schemas/concluir-manutencao.schema";
import { criarManutencaoSchema } from "./schemas/criar-manutencao.schema";
import { editarManutencaoSchema } from "./schemas/editar-manutencao.schema";

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
    "/minhas",
    {
      schema: buscarManutencaoRelacionadasAoUsuarioSchema,
      preHandler: [tokenValidoMiddleware],
    },
    manutencaoController.relacionadasAoUsuarioLogado
  );

  app.patch(
    "/:idManutencao",
    {
      schema: editarManutencaoSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR", "PROFESSOR"]),
      ],
    },
    manutencaoController.editar
  );

  app.patch(
    "/:idManutencao/concluir",
    {
      schema: concluirManutencaoSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["TECNICO"]),
      ],
    },
    manutencaoController.concluir
  );

  app.patch(
    "/:idManutencao/cancelar",
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

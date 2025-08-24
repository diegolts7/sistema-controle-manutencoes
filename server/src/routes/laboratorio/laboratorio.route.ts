import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { laboratorioController } from "../../controller/laboratorio/laboratorio.controller";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { verificarCargoMiddleware } from "../../middlewares/cargo/verificar-cargo.middleware";
import {
  criarLaboratorioFastifySchema,
  deletarLaboratorioFastifySchema,
  detalharLaboratorioFastifySchema,
  editarLaboratorioFastifySchema,
  listarLaboratoriosFastifySchema,
} from "./schemas/laboratorio.schema";

export const laboratorioRotas = (app: FastifyTypedInstance) => {
  app.post(
    "/",
    {
      schema: criarLaboratorioFastifySchema,
      //   preHandler: [
      //     tokenValidoMiddleware,
      //     verificarCargoMiddleware(["COORDENADOR"]),
      //   ],
    },
    laboratorioController.criar
  );
  app.get(
    "/",
    {
      schema: listarLaboratoriosFastifySchema,
      preHandler: [tokenValidoMiddleware],
    },
    laboratorioController.listar
  );
  app.get(
    "/:id",
    {
      schema: detalharLaboratorioFastifySchema,
      preHandler: [tokenValidoMiddleware],
    },
    laboratorioController.detalhar
  );
  app.put(
    "/:id",
    {
      schema: editarLaboratorioFastifySchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR"]),
      ],
    },
    laboratorioController.editar
  );
  app.delete(
    "/:id",
    {
      schema: deletarLaboratorioFastifySchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR"]),
      ],
    },
    laboratorioController.deletar
  );
};

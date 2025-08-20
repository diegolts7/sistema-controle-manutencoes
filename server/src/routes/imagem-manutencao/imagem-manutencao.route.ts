import { CargoEnum } from "@prisma/client";
import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { usuarioController } from "../../controller/usuario/usuario.controller";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { verificarCargoMiddleware } from "../../middlewares/cargo/verificar-cargo.middleware";
import { imagemManutencaoController } from "../../controller/imagem-manutencao/imagem-manutencao.controller";
import { uparImagensManutencaoSchema } from "./schemas/upar-imagem.schema";

export const imagemManutencaoRotas = (app: FastifyTypedInstance) => {
  app.post(
    "/:idManutencao",
    {
      schema: uparImagensManutencaoSchema,
      preHandler: [verificarCargoMiddleware(["COORDENADOR", "TECNICO"])],
    },
    imagemManutencaoController.upload
  );

  app.get(
    "/",
    { schema: {}, preHandler: tokenValidoMiddleware },
    usuarioController.buscarUsuarios
  );

  app.get(
    "/:id",
    { schema: {}, preHandler: tokenValidoMiddleware },
    usuarioController.buscarUsuarioPorId
  );

  app.patch(
    "/:id",
    {
      schema: {},
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware([CargoEnum.COORDENADOR]),
      ],
    },
    () => {}
  );
};

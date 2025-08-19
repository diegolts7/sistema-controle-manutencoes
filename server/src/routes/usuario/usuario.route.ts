import { CargoEnum } from "@prisma/client";
import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { usuarioController } from "../../controller/usuario/usuario.controller";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { verificarCargoMiddleware } from "../../middlewares/cargo/verificar-cargo.middleware";
import { buscarUsuariosSchema } from "./schemas/buscar-usuarios.schema";
import { criarUsuarioSchema } from "./schemas/criar-usuario.schema";
import { buscarUsuarioPorIdSchema } from "./schemas/buscar-usuario-por-id.schema";
import { editarUsuarioSchema } from "./schemas/editar-usuario.schema";

export const usuarioRotas = (app: FastifyTypedInstance) => {
  app.post(
    "/",
    {
      schema: criarUsuarioSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware([CargoEnum.COORDENADOR]),
      ],
    },
    usuarioController.criarUsuario
  );

  app.get(
    "/",
    { schema: buscarUsuariosSchema, preHandler: tokenValidoMiddleware },
    usuarioController.buscarUsuarios
  );

  app.get(
    "/:id",
    { schema: buscarUsuarioPorIdSchema, preHandler: tokenValidoMiddleware },
    usuarioController.buscarUsuarioPorId
  );

  app.patch(
    "/:id",
    {
      schema: editarUsuarioSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware([CargoEnum.COORDENADOR]),
      ],
    },
    usuarioController.editarUsuario
  );
};

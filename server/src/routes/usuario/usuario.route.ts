import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { usuarioController } from "../../controller/usuario/usuario.controller";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { buscarUsuariosSchema } from "./schemas/buscar-usuarios.schema";

export const usuarioRotas = (app: FastifyTypedInstance) => {
  //   app.post("/", () => {});
  app.get(
    "/",
    { schema: buscarUsuariosSchema, preHandler: tokenValidoMiddleware },
    usuarioController.buscarUsuarios
  );
  //   app.patch("/", () => {});
  //   app.patch("/desativar", () => {});
};

import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { autenticacaoController } from "../../controller/autenticacao/autenticacao.controller";
import { loginSchema } from "./schemas/login.schema";

export const autenticacaoRotas = (app: FastifyTypedInstance) => {
  app.post("/login", { schema: loginSchema }, autenticacaoController.login);
  app.post("/verificar-token", autenticacaoController.verificarToken);
  app.post("/atualizar-token", autenticacaoController.atualizarToken);
};

import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { autenticacaoController } from "../../controller/autenticacao/autenticacao.controller";
import { atualizarTokenSchema } from "./schemas/atualizar-token.schema";
import { loginSchema } from "./schemas/login.schema";
import { verificarTokenSchema } from "./schemas/verificar-token.schema";

export const autenticacaoRotas = (app: FastifyTypedInstance) => {
  app.post("/login", { schema: loginSchema }, autenticacaoController.login);
  app.post(
    "/verificar-token",
    { schema: verificarTokenSchema },
    autenticacaoController.verificarToken
  );
  app.post(
    "/atualizar-token",
    { schema: atualizarTokenSchema },
    autenticacaoController.atualizarToken
  );
};

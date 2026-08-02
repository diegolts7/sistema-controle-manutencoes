import { FastifySchema } from "fastify";
import { z } from "zod";
import { schemaTokensEnviados } from "./login.schema";

const schemaParaAtualizarToken = z.object({
  refresh: z
    .string({
      required_error: "O token é obrigatório",
      invalid_type_error: "O token deve ser uma string",
    })
    .min(10, "O token fornecido é muito curto"),
});

export const atualizarTokenSchema: FastifySchema = {
  tags: ["auth"],
  description: "Rota para atualizar o token com base no refresh token.",
  body: schemaParaAtualizarToken,
  response: {
    200: schemaTokensEnviados,
  },
  security: [],
};

export type ConteudoAtualizarToken = z.infer<typeof schemaParaAtualizarToken>;

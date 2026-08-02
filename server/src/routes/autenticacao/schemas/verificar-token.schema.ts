import { FastifySchema } from "fastify";
import { z } from "zod";

const schemaParaVerificarToken = z.object({
  access: z
    .string({
      required_error: "O token é obrigatório",
      invalid_type_error: "O token deve ser uma string",
    })
    .min(10, "O token fornecido é muito curto"),
});

export const verificarTokenSchema: FastifySchema = {
  tags: ["auth"],
  description: "Rota para verificar se o token é válido.",
  body: schemaParaVerificarToken,
  response: {
    200: z.object({}),
  },
  security: [],
};

export type ConteudoVerificarToken = z.infer<typeof schemaParaVerificarToken>;

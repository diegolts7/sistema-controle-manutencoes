import { FastifySchema } from "fastify";
import { z } from "zod";

const schemaParaReceberNoLogin = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "O e-mail deve ser uma string",
    })
    .email("O e-mail informado não é válido"),
  senha: z
    .string({
      required_error: "A senha é obrigatória",
      invalid_type_error: "A senha deve ser uma string",
    })
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const schemaTokensEnviados = z.object({
  access: z.string(),
  refresh: z.string(),
});

export const loginSchema: FastifySchema = {
  tags: ["auth"],
  description: "Rota para verificar o codigo e fazer login.",
  body: schemaParaReceberNoLogin,
  response: {
    200: schemaTokensEnviados,
  },
  security: [],
};

export type ConteudoLogin = z.infer<typeof schemaParaReceberNoLogin>;
export type ConteudoToken = z.infer<typeof schemaTokensEnviados>;

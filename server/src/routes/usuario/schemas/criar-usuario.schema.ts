import { CargoEnum } from "@prisma/client";
import { FastifySchema } from "fastify";
import { z } from "zod";
import { usuarioPublicoSchema } from "./buscar-usuarios.schema";

export const criarUsuarioBody = z.object({
  nome: z.string(),
  cargo: z.nativeEnum(CargoEnum).optional().default("PROFESSOR"),
  email: z.string().email(),
  instituicaoId: z.number(),
  ativo: z.boolean().optional().default(true),
  senha: z.string().min(8),
});

export const criarUsuarioSchema: FastifySchema = {
  tags: ["user"],
  description: "Rota para criação de um novo usuário.",
  body: criarUsuarioBody,
  response: {
    201: usuarioPublicoSchema,
  },
  security: [{ BearerAuth: [] }],
};

export type ConteudoCriarUsuario = z.infer<typeof criarUsuarioBody>;

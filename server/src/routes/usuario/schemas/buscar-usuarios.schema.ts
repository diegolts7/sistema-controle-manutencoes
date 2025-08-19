import { CargoEnum } from "@prisma/client";
import { FastifySchema } from "fastify";
import { z } from "zod";

export const booleanNaUriSchema = z
  .string()
  .optional()
  .default("false")
  .transform((valor) => valor === "true");

const queryBuscarUsuarios = z.object({
  search: z.string().optional(),
  inativos: booleanNaUriSchema,
});

export const usuarioPublicoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  cargo: z.nativeEnum(CargoEnum),
  email: z.string().email(),
  instituicaoId: z.number().nullable(),
  ativo: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const buscarUsuariosSchema: FastifySchema = {
  tags: ["user"],
  description:
    "Rota para buscar usuários do sistema podendo filtrar por nome e e-mail.",
  querystring: queryBuscarUsuarios,
  response: {
    200: z.array(usuarioPublicoSchema),
  },
  security: [{ BearerAuth: [] }],
};

export type QueryBuscarUsuarios = z.infer<typeof queryBuscarUsuarios>;

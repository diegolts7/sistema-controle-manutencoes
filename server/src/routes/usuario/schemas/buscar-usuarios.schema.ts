import { CargoEnum } from "@prisma/client";
import { FastifySchema } from "fastify";
import { z } from "zod";

const queryBuscarUsuarios = z.object({
  search: z.string().optional(),
});

export const usuarioPublicoSchema = z.object({
  nome: z.string(),
  cargo: z.nativeEnum(CargoEnum),
  email: z.string().email(),
  idExterno: z.string().uuid(),
  instituicaoId: z.number(),
  ativo: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const buscarUsuariosSchema: FastifySchema = {
  tags: ["user"],
  description: "Rota para buscar usuários por nome ou e-mail.",
  querystring: queryBuscarUsuarios,
  response: {
    200: z.array(usuarioPublicoSchema),
  },
  security: [{ BearerAuth: [] }],
};

export type QueryBuscarUsuarios = z.infer<typeof queryBuscarUsuarios>;
export type TipoUsuarioPublico = z.infer<typeof usuarioPublicoSchema>;

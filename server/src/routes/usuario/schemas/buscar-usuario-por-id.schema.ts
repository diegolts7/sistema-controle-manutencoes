import { FastifySchema } from "fastify";
import { z } from "zod";
import { usuarioPublicoSchema } from "./buscar-usuarios.schema";

export const paramsUsuarioId = z.object({
  id: z.string({
    required_error: "O id precisa ser passado no parametro",
    invalid_type_error: "O id deve ser uma string",
  }),
});

export const buscarUsuarioPorIdSchema: FastifySchema = {
  tags: ["user"],
  description: "Rota para buscar um usuário por id.",
  params: paramsUsuarioId,
  response: {
    200: usuarioPublicoSchema,
  },
  security: [{ BearerAuth: [] }],
};

export type ParamsUsuarioId = z.infer<typeof paramsUsuarioId>;

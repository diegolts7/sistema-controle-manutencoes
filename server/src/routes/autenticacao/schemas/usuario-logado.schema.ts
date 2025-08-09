import { FastifySchema } from "fastify";
import { usuarioPublicoSchema } from "../../usuario/schemas/buscar-usuarios.schema";

export const buscarUsuarioLogadoSchema: FastifySchema = {
  tags: ["auth"],
  description: "Rota para buscar o usuário logado no sistema.",
  response: {
    200: usuarioPublicoSchema,
  },
  security: [{ BearerAuth: [] }],
};

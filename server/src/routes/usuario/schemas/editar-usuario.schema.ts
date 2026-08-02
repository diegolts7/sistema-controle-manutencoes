import { FastifySchema } from "fastify";
import { usuarioPublicoSchema } from "./buscar-usuarios.schema";
import { paramsUsuarioId } from "./buscar-usuario-por-id.schema";
import { criarUsuarioBody } from "./criar-usuario.schema";
import z from "zod";

const editarUsuarioSchemaOpcional = criarUsuarioBody.partial();

export const editarUsuarioSchema: FastifySchema = {
  tags: ["user"],
  description:
    "Rota para atualizar um usuário por id, com o acesso restrito ao coordenador.",
  params: paramsUsuarioId,
  body: editarUsuarioSchemaOpcional,
  response: {
    200: usuarioPublicoSchema,
  },
  security: [{ BearerAuth: [] }],
};

export type ConteudoEditarUsuario = z.infer<typeof editarUsuarioSchemaOpcional>;

import { FastifySchema } from "fastify";
import z from "zod";
import {
  schemaManutencaoCriada,
  schemaParaCriarManutencao,
} from "./criar-manutencao.schema";
import { StatusManutencao } from "@prisma/client";
import { paramsIdNumber } from "./buscar-manutencao-por-id.schema";

export const bodyEditarManutencaoCoordenador = schemaParaCriarManutencao
  .extend({
    status: z.nativeEnum(StatusManutencao, {
      invalid_type_error: "Status manutenção inválido",
      required_error: "O Status manutenção é obrigatório",
    }),
    descricaoAposFinalizada: z.string().nullable().optional(),
    tecnicoResponsavelId: z.string().uuid(),
  })
  .strip()
  .partial();

export const bodyEditarManutencaoProfessor = schemaParaCriarManutencao
  .strip()
  .partial();

export const editarManutencaoSchema: FastifySchema = {
  tags: ["manutencao"],
  description: "Rota para editar uma manutencão por um coordenador.",
  body: z.union([
    bodyEditarManutencaoCoordenador,
    bodyEditarManutencaoProfessor,
  ]),
  params: paramsIdNumber,
  response: {
    200: schemaManutencaoCriada,
  },
  security: [{ BearerAuth: [] }],
};

export type ConteudoEditarManutencaoCoordenador = z.infer<
  typeof bodyEditarManutencaoCoordenador
>;

export type ConteudoEditarManutencaoProfessor = z.infer<
  typeof bodyEditarManutencaoProfessor
>;

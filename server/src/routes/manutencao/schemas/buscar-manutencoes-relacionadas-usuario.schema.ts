import { FastifySchema } from "fastify";
import { queryParamsBuscarManutencoesSchema } from "./buscar-manutencoes.schema";
import z from "zod";
import { schemaManutencaoCriada } from "./criar-manutencao.schema";
import { schemaManutencaoComRelacionamentos } from "./buscar-manutencao-por-id.schema";

export const buscarManutencaoRelacionadasAoUsuarioSchema: FastifySchema = {
  tags: ["manutencao"],
  description:
    "Rota para buscar as manutenções relacionadas ao usuario logado.",
  querystring: queryParamsBuscarManutencoesSchema,
  response: {
    200: z.array(schemaManutencaoCriada.or(schemaManutencaoComRelacionamentos)),
  },
  security: [{ BearerAuth: [] }],
};

import { FastifySchema } from "fastify";
import { schemaManutencaoCriada } from "./criar-manutencao.schema";
import z from "zod";
import { StatusManutencao, TipoManutencao } from "@prisma/client";
import { booleanNaUriSchema } from "../../usuario/schemas/buscar-usuarios.schema";
import { schemaManutencaoComRelacionamentos } from "./buscar-manutencao-por-id.schema";

export const queryParamsBuscarManutencoesSchema = z.object({
  status: z.nativeEnum(StatusManutencao).optional(),
  tipo: z.nativeEnum(TipoManutencao).optional(),
  complemento: booleanNaUriSchema,
});

export const buscarManutencaoSchema: FastifySchema = {
  tags: ["manutencao"],
  description: "Rota para buscar as manutenções.",
  querystring: queryParamsBuscarManutencoesSchema,
  response: {
    200: z.array(schemaManutencaoCriada.or(schemaManutencaoComRelacionamentos)),
  },
  security: [{ BearerAuth: [] }],
};

export type QueryParamsBuscarManutencoes = z.infer<
  typeof queryParamsBuscarManutencoesSchema
>;

import { FastifySchema } from "fastify";
import { schemaManutencaoCriada } from "./criar-manutencao.schema";
import { paramsIdNumber } from "./buscar-manutencao-por-id.schema";

export const cancelarManutencaoSchema: FastifySchema = {
  tags: ["manutencao"],
  description:
    "Rota para cancelar uma manutencão pelo coordenador ou professor que a solicitou.",
  params: paramsIdNumber,
  response: {
    200: schemaManutencaoCriada,
  },
  security: [{ BearerAuth: [] }],
};

import { FastifySchema } from "fastify";
import { paramsIdNumber } from "./buscar-manutencao-por-id.schema";
import z from "zod";

export const cancelarManutencaoSchema: FastifySchema = {
  tags: ["manutencao"],
  description: "Rota para deletar uma manutencão pelo coordenador.",
  params: paramsIdNumber,
  response: {
    200: z.object({}),
  },
  security: [{ BearerAuth: [] }],
};

import { FastifySchema } from "fastify";
import z from "zod";
import { paramsIdImagemManutencao } from "./atualizar-imagem.schema";

export const deletarImagemManutencaoSchema: FastifySchema = {
  tags: ["imagem-manutencao"],
  description: "Rota para deletar uma imagem de uma manutenção.",
  consumes: ["multipart/form-data"],
  params: paramsIdImagemManutencao,
  response: {
    200: z.object({}),
  },
  security: [{ BearerAuth: [] }],
};

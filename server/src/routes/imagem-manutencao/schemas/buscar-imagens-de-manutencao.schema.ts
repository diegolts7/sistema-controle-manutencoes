import { FastifySchema } from "fastify";
import { paramsIdNumber } from "../../manutencao/schemas/buscar-manutencao-por-id.schema";
import z from "zod";
import { imagemManutencaoCriada } from "./upar-imagem.schema";

export const imagemManutencaoComUrl = imagemManutencaoCriada.extend({
  url: z.string(),
});

export const buscarImagensManutencaoSchema: FastifySchema = {
  tags: ["imagem-manutencao"],
  description: "Rota para buscar as imagens de uma manutenção.",
  params: paramsIdNumber,
  response: {
    200: z.array(imagemManutencaoComUrl),
  },
  security: [{ BearerAuth: [] }],
};

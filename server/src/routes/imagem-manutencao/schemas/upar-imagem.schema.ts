import { FastifySchema } from "fastify";
import { paramsIdNumber } from "../../manutencao/schemas/buscar-manutencao-por-id.schema";
import z from "zod";

export const imagemManutencaoCriada = z.object({
  id: z.number().int(),
  manutencaoId: z.number().int(),
  nome: z.string().uuid(),
  mimetype: z.string(),
});

export const uparImagensManutencaoSchema: FastifySchema = {
  tags: ["imagem-manutencao"],
  description: "Rota para subir as imagens de uma manutenção.",
  consumes: ["multipart/form-data"],
  params: paramsIdNumber,
  response: {
    201: z.array(imagemManutencaoCriada),
  },
  security: [{ BearerAuth: [] }],
};

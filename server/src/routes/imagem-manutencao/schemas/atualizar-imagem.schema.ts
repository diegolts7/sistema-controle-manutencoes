import { FastifySchema } from "fastify";
import z from "zod";
import { imagemManutencaoComUrl } from "./buscar-imagens-de-manutencao.schema";

export const paramsIdImagemManutencao = z.object({
  idImagem: z.string().transform((val) => parseInt(val)),
});

export const atualizarImagemManutencaoSchema: FastifySchema = {
  tags: ["imagem-manutencao"],
  description: "Rota para atualizar uma imagem de uma manutenção.",
  consumes: ["multipart/form-data"],
  params: paramsIdImagemManutencao,
  response: {
    200: imagemManutencaoComUrl,
  },
  security: [{ BearerAuth: [] }],
};

export type ParamsIdImagem = z.infer<typeof paramsIdImagemManutencao>;

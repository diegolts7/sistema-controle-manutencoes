import { FastifySchema } from "fastify";
import z from "zod";
import { schemaManutencaoCriada } from "./criar-manutencao.schema";
import { paramsIdNumber } from "./buscar-manutencao-por-id.schema";

export const bodyConcluirManutencao = z
  .object({
    descricaoAposFinalizada: z
      .string({
        required_error:
          "É preciso passar a descrição do que foi feito na manutenção.",
      })
      .min(20, "A descrição precisa ter no minimo 20 caracteres."),
  })
  .strict();

export const concluirManutencaoSchema: FastifySchema = {
  tags: ["manutencao"],
  description:
    "Rota para concluir uma manutencão pelo tecnico que foi demandada.",
  body: bodyConcluirManutencao,
  params: paramsIdNumber,
  response: {
    200: schemaManutencaoCriada,
  },
  security: [{ BearerAuth: [] }],
};

export type ConteudoConcluirManutencao = z.infer<typeof bodyConcluirManutencao>;

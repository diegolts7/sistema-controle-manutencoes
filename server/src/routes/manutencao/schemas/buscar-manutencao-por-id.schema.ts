import { FastifySchema } from "fastify";
import { schemaManutencaoCriada } from "./criar-manutencao.schema";
import z from "zod";

export const schemaUsuario = z.object({
  id: z.string().uuid(),
  nome: z.string(),
});

export const schemaLaboratorio = z.object({
  id: z.number(),
  nome: z.string(),
});

export const paramsIdNumber = z.object({
  idManutencao: z.string().transform((val) => parseInt(val)),
});

export const schemaManutencaoComRelacionamentos = schemaManutencaoCriada
  .omit({
    usuarioSolicitacaoId: true,
    tecnicoResponsavelId: true,
    laboratorioId: true,
  })
  .extend({
    UsuarioSolicitou: schemaUsuario,
    TecnicoResponsavel: schemaUsuario,
    LaboratorioManutencao: schemaLaboratorio,
  });

export const buscarManutencaoPorIdSchema: FastifySchema = {
  tags: ["manutencao"],
  description: "Rota para buscar uma manutenção por id.",
  params: paramsIdNumber,
  response: {
    200: schemaManutencaoComRelacionamentos,
  },
  security: [{ BearerAuth: [] }],
};

export type ParamsIdNumber = z.infer<typeof paramsIdNumber>;

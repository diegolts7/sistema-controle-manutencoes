import { FastifySchema } from "fastify";
import { z } from "zod";
import { StatusManutencao, TipoManutencao } from "@prisma/client";

const schemaParaCriarManutencao = z
  .object({
    prazo: z
      .string({
        required_error: "O prazo é obrigatório",
        invalid_type_error: "O prazo deve ser uma string (ISO 8601)",
      })
      .datetime("O prazo deve estar em formato ISO válido")
      .transform((val) => new Date(val)),
    tipo: z
      .nativeEnum(TipoManutencao, {
        invalid_type_error: "Tipo inválido",
        required_error: "O tipo é obrigatório",
      })
      .optional()
      .default("PREVENTIVA"),
    descricaoSolicitada: z
      .string({
        required_error: "A descrição é obrigatória",
        invalid_type_error: "A descrição deve ser uma string",
      })
      .min(10, "A descrição deve ter pelo menos 10 caracteres"),
    laboratorioId: z
      .number({
        required_error: "O laboratório é obrigatório",
        invalid_type_error: "O ID do laboratório deve ser um número",
      })
      .int("O ID do laboratório deve ser inteiro")
      .positive("O ID do laboratório deve ser positivo"),
  })
  .refine((data) => data.prazo > new Date(), {
    message: "Data do prazo precisa ser maior do que a data atual",
    path: ["prazo"],
  });

export const schemaManutencaoCriada = z.object({
  id: z.number(),
  prazo: z.coerce.date(),
  status: z.nativeEnum(StatusManutencao),
  tipo: z.nativeEnum(TipoManutencao),
  descricaoSolicitada: z.string(),
  descricaoAposFinalizada: z.string().nullable(),
  usuarioSolicitacaoId: z.string().uuid(),
  tecnicoResponsavelId: z.string().uuid(),
  laboratorioId: z.number(),
  dataSolicitada: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const criarManutencaoSchema: FastifySchema = {
  tags: ["manutencao"],
  description: "Rota para criar uma nova manutenção (solicitação).",
  body: schemaParaCriarManutencao,
  response: {
    201: schemaManutencaoCriada,
  },
  security: [{ BearerAuth: [] }],
};

export type ConteudoCriarManutencao = z.infer<typeof schemaParaCriarManutencao>;

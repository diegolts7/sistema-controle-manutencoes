import { FastifySchema } from "fastify";
import { z } from "zod";

const instituicaoEnsinoSchema = z.object({
  nome: z.string({
    required_error: "O nome é obrigatório",
    invalid_type_error: "O nome deve ser uma string",
  })
  .min(3, "O nome deve ter pelo menos 3 caracteres")
  .max(50, "O nome deve ter no máximo 50 caracteres"),
  cnpj: z.string({
    required_error: "O CNPJ é obrigatório",
    invalid_type_error: "O CNPJ deve ser uma string",
  })
  .length(14, "O CNPJ deve ter 14 caracteres"),
  latitude: z.number({
    required_error: "A latitude é obrigatória",
    invalid_type_error: "A latitude deve ser um número",
  }),
  longitude: z.number({
    required_error: "A longitude é obrigatória",
    invalid_type_error: "A longitude deve ser um número",
  }),
});

export type InstituicaoEnsinoDTO = z.infer<typeof instituicaoEnsinoSchema>;
export type InstituicaoEnsinoUpdateDTO = Partial<InstituicaoEnsinoDTO>;

export const criarInstituicaoSchema: FastifySchema = {
  tags: ["instituicao-ensino"],
  description: "Rota para criar uma nova instituição de ensino",
  body: instituicaoEnsinoSchema,
  security: [{ BearerAuth: [] }],
};

export const atualizarInstituicaoSchema: FastifySchema = {
  tags: ["instituicao-ensino"],
  description: "Rota para atualizar uma instituição de ensino",
  body: instituicaoEnsinoSchema.partial(),
  params: z.object({
    id: z.string().transform(Number),
  }),
  security: [{ BearerAuth: [] }],
};

export const buscarInstituicaoSchema: FastifySchema = {
  tags: ["instituicao-ensino"],
  description: "Rota para buscar uma instituição de ensino por ID",
  params: z.object({
    id: z.string().transform(Number),
  }),
  security: [{ BearerAuth: [] }],
};

export const listarInstituicoesSchema: FastifySchema = {
  tags: ["instituicao-ensino"],
  description: "Rota para listar todas as instituições de ensino",
  security: [{ BearerAuth: [] }],
};

export const deletarInstituicaoSchema: FastifySchema = {
  tags: ["instituicao-ensino"],
  description: "Rota para deletar uma instituição de ensino",
  params: z.object({
    id: z.string().transform(Number),
  }),
  security: [{ BearerAuth: [] }],
};
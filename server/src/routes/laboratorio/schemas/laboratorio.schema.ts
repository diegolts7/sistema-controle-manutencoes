import { FastifySchema } from "fastify";
import { z } from "zod";

const laboratorioPublicoSchema = z.object({
  nome: z.string(),
  descricao: z.string().nullable(),
  responsavelId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const criarLaboratorioBodySchema = z.object({
  nome: z.string({ required_error: "O nome é obrigatório" }),
  descricao: z.string().optional().nullable(),
  responsavelId: z
    .string({ required_error: "O ID do responsável é obrigatório" })
    .uuid("O ID do responsável deve ser um UUID válido"),
});

const editarLaboratorioBodySchema = criarLaboratorioBodySchema.partial();

const paramsSchema = z.object({
  id: z.coerce.number({ invalid_type_error: "O ID deve ser um número" }),
});

export const criarLaboratorioFastifySchema: FastifySchema = {
  tags: ["laboratorios"],
  description: "Cria um novo laboratório",
  body: criarLaboratorioBodySchema,
  response: { 201: laboratorioPublicoSchema },
};

export const listarLaboratoriosFastifySchema: FastifySchema = {
  tags: ["laboratorios"],
  description: "Lista todos os laboratórios",
  response: { 200: z.array(laboratorioPublicoSchema) },
};

export const detalharLaboratorioFastifySchema: FastifySchema = {
  tags: ["laboratorios"],
  description: "Detalha um laboratório específico",
  params: paramsSchema,
  response: { 200: laboratorioPublicoSchema },
};

export const editarLaboratorioFastifySchema: FastifySchema = {
  tags: ["laboratorios"],
  description: "Edita um laboratório",
  params: paramsSchema,
  body: editarLaboratorioBodySchema,
  response: { 200: laboratorioPublicoSchema },
};

export const deletarLaboratorioFastifySchema: FastifySchema = {
  tags: ["laboratorios"],
  description: "Deleta um laboratório existente",
  params: paramsSchema,
  response: { 200: z.object({}) },
};

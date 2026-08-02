import { FastifySchema } from "fastify";
import { z } from "zod";

const contadoresGeraisSchema = z.object({
  totalUsuarios: z.number(),
  totalUsuariosAtivos: z.number(),
  totalLaboratorios: z.number(),
  totalInstituicoesEnsino: z.number(),
  totalManutencoes: z.number(),
});

const manutencoesPorStatusSchema = z.object({
  SOLICITADA: z.number(),
  CONCLUIDA: z.number(),
  CANCELADA: z.number(),
});

const manutencoesPorTipoSchema = z.object({
  PREVENTIVA: z.number(),
  CORRETIVA: z.number(),
});

const manutencaoUrgenteSchema = z.object({
  id: z.number().int(),
  laboratorio: z.string(),
  prazo: z.coerce.date(),
  diasEmAtraso: z.number().int(),
});

const manutencoesEmAtrasoSchema = z.object({
  quantidade: z.number(),
  maisUrgentes: z.array(manutencaoUrgenteSchema),
});

const cargaTecnicoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  manutencoesConcluidas: z.number(),
  manutencoesPendentes: z.number(),
});

const evolucaoMensalSchema = z.object({
  mes: z.string(),
  quantidade: z.number(),
});

const rankingLaboratorioSchema = z.object({
  id: z.number().int(),
  nome: z.string(),
  quantidadeManutencoes: z.number(),
});

const dashboardSchema = z.object({
  contadoresGerais: contadoresGeraisSchema,
  manutencoesPorStatus: manutencoesPorStatusSchema,
  manutencoesPorTipo: manutencoesPorTipoSchema,
  manutencoesEmAtraso: manutencoesEmAtrasoSchema,
  cargaPorTecnico: z.array(cargaTecnicoSchema),
  evolucaoMensal: z.array(evolucaoMensalSchema),
  rankingLaboratorios: z.array(rankingLaboratorioSchema),
});

export const buscarDashboardFastifySchema: FastifySchema = {
  tags: ["dashboard"],
  description:
    "Retorna métricas quantitativas do sistema (usuários, laboratórios, manutenções) para o coordenador monitorar",
  response: { 200: dashboardSchema },
  security: [{ BearerAuth: [] }],
};

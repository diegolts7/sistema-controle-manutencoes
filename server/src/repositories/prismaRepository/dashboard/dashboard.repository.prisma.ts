import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";

export class DashboardRepositoryPrisma {
  constructor(private readonly prismaService: PrismaClient) {}

  contarUsuarios = async (): Promise<number> => {
    return await this.prismaService.usuario.count();
  };

  contarUsuariosAtivos = async (): Promise<number> => {
    return await this.prismaService.usuario.count({ where: { ativo: true } });
  };

  contarLaboratorios = async (): Promise<number> => {
    return await this.prismaService.laboratorio.count();
  };

  contarInstituicoesEnsino = async (): Promise<number> => {
    return await this.prismaService.instituicaoEnsino.count();
  };

  contarManutencoes = async (): Promise<number> => {
    return await this.prismaService.manutencao.count();
  };

  contarManutencoesPorStatus = async () => {
    return await this.prismaService.manutencao.groupBy({
      by: ["status"],
      _count: { _all: true },
    });
  };

  contarManutencoesPorTipo = async () => {
    return await this.prismaService.manutencao.groupBy({
      by: ["tipo"],
      _count: { _all: true },
    });
  };

  contarManutencoesEmAtraso = async (dataAtual: Date): Promise<number> => {
    return await this.prismaService.manutencao.count({
      where: {
        status: "SOLICITADA",
        prazo: { lt: dataAtual },
      },
    });
  };

  buscarManutencoesMaisUrgentesEmAtraso = async (
    dataAtual: Date,
    limite: number,
  ) => {
    return await this.prismaService.manutencao.findMany({
      where: {
        status: "SOLICITADA",
        prazo: { lt: dataAtual },
      },
      orderBy: { prazo: "asc" },
      take: limite,
      select: {
        id: true,
        prazo: true,
        LaboratorioManutencao: { select: { nome: true } },
      },
    });
  };

  buscarTecnicosAtivos = async () => {
    return await this.prismaService.usuario.findMany({
      where: { cargo: "TECNICO", ativo: true },
      select: { id: true, nome: true },
    });
  };

  contarManutencoesPorTecnicoEStatus = async () => {
    return await this.prismaService.manutencao.groupBy({
      by: ["tecnicoResponsavelId", "status"],
      _count: { _all: true },
    });
  };

  buscarEvolucaoMensal = async (dataInicial: Date) => {
    return await this.prismaService.$queryRaw<
      { mes: Date; quantidade: number }[]
    >`
      SELECT date_trunc('month', data_solicitada) as mes, count(*)::int as quantidade
      FROM manutencoes
      WHERE data_solicitada >= ${dataInicial}
      GROUP BY mes
      ORDER BY mes ASC
    `;
  };

  rankingLaboratoriosComMaisManutencoes = async (limite: number) => {
    return await this.prismaService.manutencao.groupBy({
      by: ["laboratorioId"],
      _count: { laboratorioId: true },
      orderBy: { _count: { laboratorioId: "desc" } },
      take: limite,
    });
  };

  buscarLaboratoriosPorIds = async (ids: number[]) => {
    return await this.prismaService.laboratorio.findMany({
      where: { id: { in: ids } },
      select: { id: true, nome: true },
    });
  };
}

export const dashboardRepositoryPrisma = new DashboardRepositoryPrisma(prisma);

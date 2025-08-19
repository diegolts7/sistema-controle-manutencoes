import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";
import {
  TipoCriarManutencao,
  TipoManutencao,
  TipoManutencaoComUsuariosEvidentes,
} from "../../../core/manutencao/entity/manutencao.entity";

export class ManutencaoRepositoryPrisma {
  private readonly selectInformacaoManutencaoExtra = {
    id: true,
    nome: true,
  };
  private readonly manutencaoComDadosEstendidos = {
    omit: {
      usuarioSolicitacaoId: true,
      tecnicoResponsavelId: true,
      laboratorioId: true,
    },
    include: {
      UsuarioSolicitou: {
        select: this.selectInformacaoManutencaoExtra,
      },
      TecnicoResponsavel: {
        select: this.selectInformacaoManutencaoExtra,
      },
      LaboratorioManutencao: {
        select: this.selectInformacaoManutencaoExtra,
      },
    },
  };

  constructor(private readonly prismaService: PrismaClient) {}

  criarManutencao = async (
    manutencao: TipoCriarManutencao
  ): Promise<TipoManutencao> => {
    return await this.prismaService.manutencao.create({
      data: manutencao,
    });
  };

  buscarManutencoesPorCondicao = async (
    filtros?: Partial<TipoManutencao>,
    comDadosEstendidos: boolean = false
  ): Promise<TipoManutencao[] | TipoManutencaoComUsuariosEvidentes[]> => {
    const dadosParaEstender = comDadosEstendidos
      ? this.manutencaoComDadosEstendidos
      : {};

    return await this.prismaService.manutencao.findMany({
      where: filtros || {},
      ...dadosParaEstender,
      orderBy: {
        prazo: "asc",
      },
    });
  };

  buscarManutencaoPorId = async (
    id: number
  ): Promise<TipoManutencaoComUsuariosEvidentes | null> => {
    return await this.prismaService.manutencao.findUnique({
      where: { id },
      ...this.manutencaoComDadosEstendidos,
    });
  };
}

export const manutencaoRepositoryPrisma = new ManutencaoRepositoryPrisma(
  prisma
);

import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";
import {
  TipoCriarManutencao,
  TipoEditarManutencao,
  TipoManutencao,
  TipoManutencaoComComplemento,
} from "../../../core/manutencao/entity/manutencao.entity";

export class ManutencaoRepositoryPrisma {
  private readonly MANUTENCOES_ZERADOS = 0;

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

  existeManutencao = async (
    data: Partial<TipoManutencao>
  ): Promise<boolean> => {
    const count = await this.prismaService.manutencao.count({ where: data });
    return count > this.MANUTENCOES_ZERADOS;
  };

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
  ): Promise<TipoManutencao[] | TipoManutencaoComComplemento[]> => {
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
  ): Promise<TipoManutencao | null> => {
    return await this.prismaService.manutencao.findUnique({
      where: { id },
    });
  };

  buscarManutencaoPorIdComComplemento = async (
    id: number
  ): Promise<TipoManutencaoComComplemento | null> => {
    return await this.prismaService.manutencao.findUnique({
      where: { id },
      ...this.manutencaoComDadosEstendidos,
    });
  };

  editarManutencao = async (
    id: number,
    data: TipoEditarManutencao
  ): Promise<TipoManutencao | null> => {
    return await this.prismaService.manutencao.update({
      where: { id },
      data,
    });
  };

  deletarManutencao = async (id: number): Promise<TipoManutencao | null> => {
    return await this.prismaService.manutencao.delete({
      where: { id },
    });
  };
}

export const manutencaoRepositoryPrisma = new ManutencaoRepositoryPrisma(
  prisma
);

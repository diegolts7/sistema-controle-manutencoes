import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";
import {
  TipoCriarImagemManutencao,
  TipoEditarImagemManutencao,
  TipoImagemManutencao,
} from "../../../core/imagem-manutencao/entity/imagem-manutencao.entity";

export class ImagemManutencaoRepositoryPrisma {
  constructor(private readonly prismaService: PrismaClient) {}

  buscarPorId = async (id: number): Promise<TipoImagemManutencao | null> => {
    return await this.prismaService.imagemManutencao.findUnique({
      where: { id },
    });
  };

  criarVarias = async (
    imagensManutencao: TipoCriarImagemManutencao[]
  ): Promise<TipoImagemManutencao[]> => {
    return await this.prismaService.imagemManutencao.createManyAndReturn({
      data: imagensManutencao,
    });
  };

  buscarPorCondicao = async (
    filtros: TipoEditarImagemManutencao = {}
  ): Promise<TipoImagemManutencao[]> => {
    return await this.prismaService.imagemManutencao.findMany({
      where: filtros,
    });
  };

  atualizar = async (
    id: number,
    data: TipoEditarImagemManutencao
  ): Promise<TipoImagemManutencao> => {
    return await this.prismaService.imagemManutencao.update({
      where: { id },
      data,
    });
  };

  deletar = async (id: number): Promise<TipoImagemManutencao> => {
    return await this.prismaService.imagemManutencao.delete({
      where: { id },
    });
  };
}

export const imagemManutencaoRepositoryPrisma =
  new ImagemManutencaoRepositoryPrisma(prisma);

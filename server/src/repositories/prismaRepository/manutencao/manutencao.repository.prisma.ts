import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";
import {
  TipoCriarManutencao,
  TipoManutencao,
} from "../../../core/manutencao/entity/manutencao.entity";

export class ManutencaoRepositoryPrisma {
  constructor(private readonly prismaService: PrismaClient) {}

  criarManutencao = async (
    manutencao: TipoCriarManutencao
  ): Promise<TipoManutencao> => {
    return await this.prismaService.manutencao.create({
      data: manutencao,
    });
  };
}

export const manutencaoRepositoryPrisma = new ManutencaoRepositoryPrisma(
  prisma
);

import { PrismaClient, InstituicaoEnsino } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";
import {
  InstituicaoEnsinoCreateDTO,
  InstituicaoEnsinoDTO,
  InstituicaoEnsinoUpdateDTO,
} from "../../../routes/instituicao-ensino/schemas/instituicao-ensino.schema";

export class InstituicaoEnsinoRepositoryPrisma {
  constructor(private readonly prismaService: PrismaClient) {}

  async criar(data: InstituicaoEnsinoCreateDTO): Promise<InstituicaoEnsinoDTO> {
    return await this.prismaService.instituicaoEnsino.create({
      data,
    });
  }

  async buscarPorId(id: number): Promise<InstituicaoEnsinoDTO | null> {
    return await this.prismaService.instituicaoEnsino.findUnique({
      where: { id },
    });
  }

  async buscarPorCnpj(cnpj: string): Promise<InstituicaoEnsinoDTO | null> {
    return await this.prismaService.instituicaoEnsino.findUnique({
      where: { cnpj },
    });
  }

  async listar(): Promise<InstituicaoEnsinoDTO[]> {
    return await this.prismaService.instituicaoEnsino.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async atualizar(
    id: number,
    data: InstituicaoEnsinoUpdateDTO
  ): Promise<InstituicaoEnsino> {
    return await this.prismaService.instituicaoEnsino.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async deletar(id: number): Promise<InstituicaoEnsinoDTO> {
    return await this.prismaService.instituicaoEnsino.delete({
      where: { id },
    });
  }
}

export const instituicaoEnsinoRepositoryPrisma =
  new InstituicaoEnsinoRepositoryPrisma(prisma);

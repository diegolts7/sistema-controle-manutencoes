import { PrismaClient, InstituicaoEnsino } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";
import { InstituicaoEnsinoDTO, InstituicaoEnsinoUpdateDTO } from "../../../routes/instituicao-ensino/schemas/instituicao-ensino.schema";

export class InstituicaoEnsinoRepositoryPrisma {
  constructor(private readonly prismaService: PrismaClient) {}

  async criar(data: InstituicaoEnsinoDTO): Promise<InstituicaoEnsino> {
    return await this.prismaService.instituicaoEnsino.create({ 
      data: {
        nome: data.nome,
        cnpj: data.cnpj,
        latitude: data.latitude,
        longitude: data.longitude
      }
    });
  }

  async buscarPorId(id: number): Promise<InstituicaoEnsino | null> {
    return await this.prismaService.instituicaoEnsino.findUnique({
      where: { id },
    });
  }

  async buscarPorCnpj(cnpj: string): Promise<InstituicaoEnsino | null> {
    return await this.prismaService.instituicaoEnsino.findUnique({
      where: { cnpj },
    });
  }

  async listar(): Promise<InstituicaoEnsino[]> {
    return await this.prismaService.instituicaoEnsino.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async atualizar(id: number, data: InstituicaoEnsinoUpdateDTO): Promise<InstituicaoEnsino> {
    return await this.prismaService.instituicaoEnsino.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      },
    });
  }

  async deletar(id: number): Promise<void> {
    await this.prismaService.instituicaoEnsino.delete({
      where: { id },
    });
  }
}

export const instituicaoEnsinoRepositoryPrisma = new InstituicaoEnsinoRepositoryPrisma(prisma);
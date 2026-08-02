import { Laboratorio, PrismaClient } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";
import { TipoCriarLaboratorio, TipoEditarLaboratorio } from "../../../core/laboratorio/entity/laboratorio.entity";

export class LaboratorioRepositoryPrisma {
    constructor(private readonly prismaService: PrismaClient) {}
    
    criar = async (data: TipoCriarLaboratorio): Promise<Laboratorio> => {
    return await this.prismaService.laboratorio.create({ data });
  };

    buscarTodos = async (): Promise<Laboratorio[]> => {
        return await this.prismaService.laboratorio.findMany();
    };

    buscarPorId = async (id: number): Promise<Laboratorio | null> => {
        return await this.prismaService.laboratorio.findUnique({ where: { id } });
    };

    editar = async (id: number, data: TipoEditarLaboratorio): Promise<Laboratorio> => {
        return await this.prismaService.laboratorio.update({ where: { id }, data });
    };

    buscarPorNome = async (nome: string): Promise<Laboratorio | null> => {
    return await this.prismaService.laboratorio.findFirst({
      where: {
        nome: {
          equals: nome,
          mode: "insensitive", // Garante que "Lab 1" e "lab 1" sejam considerados iguais
        },
      },
    });
  };

    deletar = async (id: number): Promise<Laboratorio> => {
        return await this.prismaService.laboratorio.delete({ where: { id } });
    };
}

export const laboratorioRepositoryPrisma = new LaboratorioRepositoryPrisma(prisma);
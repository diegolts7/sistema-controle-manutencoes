import { PrismaClient, Usuario } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";

export class UsuarioRepositoryPrisma {
  constructor(private readonly prismaService: PrismaClient) {}

  buscarPorId = async (id: number): Promise<Usuario | null> => {
    return await this.prismaService.usuario.findUnique({
      where: { id },
    });
  };

  buscarPorIdExterno = async (id: string): Promise<Usuario | null> => {
    return await this.prismaService.usuario.findUnique({
      where: { idExterno: id },
    });
  };

  buscarPorEmail = async (email: string): Promise<Usuario | null> => {
    return await this.prismaService.usuario.findUnique({ where: { email } });
  };

  //   async buscarUsuariosPorCondicao(data: Partial<Usuario>) {
  //     return await this.prismaService.usuario.findMany({ where: data });
  //   }

  //   async criarUsuario(data: CreateUser) {
  //     return await this.prismaService.usuario.create({ data });
  //   }

  //   async editarUsuario(id: number, data: EditUser) {
  //     return await this.prismaService.usuario.update({ data, where: { id } });
  //   }
}

export const usuarioRepositoryPrisma = new UsuarioRepositoryPrisma(prisma);

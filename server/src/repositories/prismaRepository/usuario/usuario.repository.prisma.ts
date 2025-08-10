import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";
import {
  TipoCriarUsuario,
  TipoEditarUsuario,
  TipoUsuario,
  TipoUsuarioPublico,
} from "../../../core/usuario/entity/usuario.entity";

export class UsuarioRepositoryPrisma {
  private readonly USUARIOS_ZERADOS = 0;
  private readonly OMIT_USUARIO_PUBLICO = { senha: true, id: true };

  constructor(private readonly prismaService: PrismaClient) {}

  existeUsuario = async (data: Partial<TipoUsuario>): Promise<boolean> => {
    const count = await this.prismaService.usuario.count({ where: data });
    return count > this.USUARIOS_ZERADOS;
  };

  buscarPorId = async (id: number): Promise<TipoUsuario | null> => {
    return await this.prismaService.usuario.findUnique({
      where: { id },
    });
  };

  buscarPorIdExterno = async (
    id: string
  ): Promise<TipoUsuarioPublico | null> => {
    return await this.prismaService.usuario.findUnique({
      where: { idExterno: id },
      omit: this.OMIT_USUARIO_PUBLICO,
    });
  };

  buscarPorEmail = async (email: string): Promise<TipoUsuario | null> => {
    return await this.prismaService.usuario.findUnique({ where: { email } });
  };

  buscarUsuariosPorCondicao = async (
    data: Partial<TipoUsuario> = {}
  ): Promise<TipoUsuarioPublico[]> => {
    return await this.prismaService.usuario.findMany({
      where: { ...data },
      omit: this.OMIT_USUARIO_PUBLICO,
      orderBy: { createdAt: "desc" },
    });
  };

  buscarUsuariosPorNomeEmailComCondicao = async (
    search: string,
    data: Partial<TipoUsuario> = {}
  ) => {
    return await this.prismaService.usuario.findMany({
      where: {
        ...data,
        OR: [
          { nome: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
      omit: this.OMIT_USUARIO_PUBLICO,
      orderBy: { createdAt: "desc" },
    });
  };

  criarUsuario = async (
    data: TipoCriarUsuario
  ): Promise<TipoUsuarioPublico | null> => {
    return await this.prismaService.usuario.create({
      data,
      omit: this.OMIT_USUARIO_PUBLICO,
    });
  };

  editarUsuario = async (
    idExterno: string,
    data: TipoEditarUsuario
  ): Promise<TipoUsuario | null> => {
    return await this.prismaService.usuario.update({
      data,
      where: { idExterno },
    });
  };

  desativarUsuario = async (id: string) => {
    return await this.editarUsuario(id, { ativo: false });
  };
}

export const usuarioRepositoryPrisma = new UsuarioRepositoryPrisma(prisma);

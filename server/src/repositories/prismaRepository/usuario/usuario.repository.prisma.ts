import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../services/prisma/prisma";
import {
  TipoCriarUsuario,
  TipoEditarUsuario,
  TipoUsuario,
} from "../../../core/usuario/entity/usuario.entity";

const USUARIOS_ZERADOS = 0;

export class UsuarioRepositoryPrisma {
  constructor(private readonly prismaService: PrismaClient) {}

  existeUsuario = async (data: Partial<TipoUsuario>): Promise<boolean> => {
    const count = await this.prismaService.usuario.count({ where: data });
    return count > USUARIOS_ZERADOS;
  };

  existeUsuarioPorEmail = async (email: string): Promise<boolean> => {
    const count = await this.prismaService.usuario.count({ where: { email } });
    return count > USUARIOS_ZERADOS;
  };

  buscarPorId = async (id: number): Promise<TipoUsuario | null> => {
    return await this.prismaService.usuario.findUnique({
      where: { id },
    });
  };

  buscarPorIdExterno = async (id: string): Promise<TipoUsuario | null> => {
    return await this.prismaService.usuario.findUnique({
      where: { idExterno: id },
    });
  };

  buscarPorEmail = async (email: string): Promise<TipoUsuario | null> => {
    return await this.prismaService.usuario.findUnique({ where: { email } });
  };

  buscarUsuariosPorCondicao = async (
    data: Partial<TipoUsuario> = {}
  ): Promise<TipoUsuario[]> => {
    return await this.prismaService.usuario.findMany({ where: data });
  };

  buscarTodosUsuarios = async () => {
    return await this.buscarUsuariosPorCondicao();
  };

  criarUsuario = async (
    data: TipoCriarUsuario
  ): Promise<TipoUsuario | null> => {
    return await this.prismaService.usuario.create({ data });
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

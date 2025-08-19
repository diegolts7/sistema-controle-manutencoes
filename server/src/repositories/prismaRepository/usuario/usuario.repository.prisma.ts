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
  private readonly OMIT_USUARIO_PUBLICO = { senha: true };

  constructor(private readonly prismaService: PrismaClient) {}

  existeUsuario = async (data: Partial<TipoUsuario>): Promise<boolean> => {
    const count = await this.prismaService.usuario.count({ where: data });
    return count > this.USUARIOS_ZERADOS;
  };

  buscarPorId = async (id: string): Promise<TipoUsuario | null> => {
    return await this.prismaService.usuario.findUnique({
      where: { id },
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
    id: string,
    data: TipoEditarUsuario
  ): Promise<TipoUsuario | null> => {
    return await this.prismaService.usuario.update({
      data,
      where: { id },
    });
  };

  buscarIdUsuarioComMenosManutencao = async (): Promise<string | null> => {
    const usuariosComMenosManutencoes = await prisma.usuario.findFirst({
      where: { cargo: "TECNICO" },
      select: {
        id: true,
        _count: {
          select: {
            ManutencoesFeitas: {
              where: {
                status: { in: ["SOLICITADA"] },
              },
            },
          },
        },
      },
      orderBy: {
        ManutencoesFeitas: {
          _count: "asc",
        },
      },
    });

    return usuariosComMenosManutencoes?.id || null;
  };

  desativarUsuario = async (id: string) => {
    return await this.editarUsuario(id, { ativo: false });
  };
}

export const usuarioRepositoryPrisma = new UsuarioRepositoryPrisma(prisma);

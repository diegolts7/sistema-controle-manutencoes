import {
  usuarioRepositoryPrisma,
  UsuarioRepositoryPrisma,
} from "../../../repositories/prismaRepository/usuario/usuario.repository.prisma";

export class UsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPrisma) {}

  buscarUsuarios = async (search?: string) => {
    const parametroBuscaUsuarios = search ? search : {};

    const usuarios =
      await this.usuarioRepository.buscarUsuariosAtivosPorCondicao(
        parametroBuscaUsuarios
      );

    return usuarios;
  };
}

export const usuarioUseCase = new UsuarioUseCase(usuarioRepositoryPrisma);

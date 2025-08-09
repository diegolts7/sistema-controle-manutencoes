import {
  usuarioRepositoryPrisma,
  UsuarioRepositoryPrisma,
} from "../../../repositories/prismaRepository/usuario/usuario.repository.prisma";
import { TipoCriarUsuario } from "../entity/usuario.entity";
import bcrypt from "bcrypt";

const SALT_SENHA = 10;

export class UsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPrisma) {}

  criarUsuario = async (usuario: TipoCriarUsuario) => {
    const senhaCriptografada = bcrypt.hashSync(usuario.senha, SALT_SENHA);

    const usuarioCriado = await this.usuarioRepository.criarUsuario({
      ...usuario,
      senha: senhaCriptografada,
    });

    return usuarioCriado;
  };

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

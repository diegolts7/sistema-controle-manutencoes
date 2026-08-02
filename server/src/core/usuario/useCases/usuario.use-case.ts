import {
  usuarioRepositoryPrisma,
  UsuarioRepositoryPrisma,
} from "../../../repositories/prismaRepository/usuario/usuario.repository.prisma";
import { bcryptService } from "../../../services/bcrypt/bcrypt-service";
import { BadRequestError, NotFoundError } from "../../../utils/helpers/api-error.helpers";
import { CargoEnum, TipoCriarUsuario, TipoEditarUsuario } from "../entity/usuario.entity";

export class UsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPrisma) {}

  criarUsuario = async (usuario: TipoCriarUsuario) => {
    const existeUsuario = await this.usuarioRepository.existeUsuario({
      email: usuario.email,
    });

    if (existeUsuario) {
      throw new BadRequestError("Usuario com esse email já existe");
    }

    const senhaCriptografada = await bcryptService.gerarHashSenha(usuario.senha);

    const usuarioCriado = await this.usuarioRepository.criarUsuario({
      ...usuario,
      senha: senhaCriptografada,
    });

    return usuarioCriado;
  };

  buscarUsuarioPorId = async (id: string) => {
    const usuario = await this.usuarioRepository.buscarPorId(id);

    if (!usuario) {
      throw new NotFoundError("Usuario com esse id não existe no banco.");
    }

    return usuario;
  };

  buscarUsuarios = async ({
    search,
    inativos = false,
    cargo,
  }: {
    search?: string;
    inativos: boolean;
    cargo?: CargoEnum;
  }) => {
    const filtroPorUsuarioAtivoOuNao = inativos ? {} : { ativo: true };
    const filtroPorCargoUsuario = cargo ? { cargo } : {};
    const filtros = {
      ...filtroPorUsuarioAtivoOuNao,
      ...filtroPorCargoUsuario,
    };

    const usuarios = search
      ? await this.usuarioRepository.buscarUsuariosPorNomeEmailComCondicao(search, filtros)
      : await this.usuarioRepository.buscarUsuariosPorCondicao(filtros);

    return usuarios;
  };

  editarUsuario = async (id: string, data: TipoEditarUsuario) => {
    const existeUsuario = await this.usuarioRepository.existeUsuario({
      id: id,
    });

    if (!existeUsuario) {
      throw new BadRequestError("Usuario com esse id não existe no banco");
    }

    const usuarioEditado = await this.usuarioRepository.editarUsuario(id, data);

    return usuarioEditado;
  };
}

export const usuarioUseCase = new UsuarioUseCase(usuarioRepositoryPrisma);

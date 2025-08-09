import {
  usuarioRepositoryPrisma,
  UsuarioRepositoryPrisma,
} from "../../../repositories/prismaRepository/usuario/usuario.repository.prisma";
import { bcryptService } from "../../../services/bcrypt/bcrypt-service";
import { NotFoundError } from "../../../utils/helpers/api-error.helpers";
import { TipoCriarUsuario, TipoEditarUsuario } from "../entity/usuario.entity";

export class UsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPrisma) {}

  criarUsuario = async (usuario: TipoCriarUsuario) => {
    const senhaCriptografada = await bcryptService.gerarHashSenha(
      usuario.senha
    );

    const usuarioCriado = await this.usuarioRepository.criarUsuario({
      ...usuario,
      senha: senhaCriptografada,
    });

    return usuarioCriado;
  };

  buscarUsuarioPorId = async (idExterno: string) => {
    const usuario = await this.usuarioRepository.buscarPorIdExterno(idExterno);

    if (!usuario) {
      throw new NotFoundError("Usuario com esse id não existe no banco.");
    }

    return usuario;
  };

  buscarUsuarios = async (search?: string, inativos: boolean = false) => {
    const filtroPorUsuarioAtivoOuNao = inativos ? {} : { ativo: true };

    const usuarios = search
      ? await this.usuarioRepository.buscarUsuariosPorNomeEmailComCondicao(
          search
        )
      : await this.usuarioRepository.buscarUsuariosPorCondicao(
          filtroPorUsuarioAtivoOuNao
        );

    return usuarios;
  };

  editarUsuario = async (id: string, data: TipoEditarUsuario) => {
    const usuarioEditado = await this.usuarioRepository.editarUsuario(id, data);

    return usuarioEditado;
  };
}

export const usuarioUseCase = new UsuarioUseCase(usuarioRepositoryPrisma);

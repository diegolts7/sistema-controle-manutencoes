import {
  manutencaoRepositoryPrisma,
  ManutencaoRepositoryPrisma,
} from "../../../repositories/prismaRepository/manutencao/manutencao.repository.prisma";
import {
  UsuarioRepositoryPrisma,
  usuarioRepositoryPrisma,
} from "../../../repositories/prismaRepository/usuario/usuario.repository.prisma";
import { BadRequestError } from "../../../utils/helpers/api-error.helpers";
import { TipoManutencaoRecebidoNaCriacao } from "../entity/manutencao.entity";

export class ManutencaoUseCase {
  constructor(
    private readonly manutencaoRepository: ManutencaoRepositoryPrisma,
    private readonly usuarioRepository: UsuarioRepositoryPrisma
  ) {}

  criarManutencao = async (manutencao: TipoManutencaoRecebidoNaCriacao) => {
    const idTecnicoComMenosManutencao =
      await this.usuarioRepository.buscarIdUsuarioComMenosManutencao();

    if (!idTecnicoComMenosManutencao) {
      throw new BadRequestError(
        "Não é possivel cadastrar a manutenção, nenhum tecnico cadastrado no sistema"
      );
    }

    const manutencaoCriada = await this.manutencaoRepository.criarManutencao({
      ...manutencao,
      tecnicoResponsavelId: idTecnicoComMenosManutencao,
    });

    return manutencaoCriada;
  };
}

export const manutencaoUseCase = new ManutencaoUseCase(
  manutencaoRepositoryPrisma,
  usuarioRepositoryPrisma
);

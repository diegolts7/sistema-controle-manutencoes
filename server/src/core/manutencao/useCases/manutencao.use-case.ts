import {
  manutencaoRepositoryPrisma,
  ManutencaoRepositoryPrisma,
} from "../../../repositories/prismaRepository/manutencao/manutencao.repository.prisma";
import {
  UsuarioRepositoryPrisma,
  usuarioRepositoryPrisma,
} from "../../../repositories/prismaRepository/usuario/usuario.repository.prisma";
import { QueryParamsBuscarManutencoes } from "../../../routes/manutencao/schemas/buscar-manutencoes.schema";
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

  buscarManutencoes = async ({
    complemento,
    ...filtrosAdicionais
  }: QueryParamsBuscarManutencoes) => {
    const manutencoes =
      await this.manutencaoRepository.buscarManutencoesPorCondicao(
        filtrosAdicionais,
        complemento
      );

    return manutencoes;
  };

  buscarManutencaoPorId = async (id: number) => {
    const manutencao = await this.manutencaoRepository.buscarManutencaoPorId(
      id
    );

    if (!manutencao) {
      throw new BadRequestError(
        "Manutenção com esse identificador não existe."
      );
    }

    console.log(manutencao);

    return manutencao;
  };
}

export const manutencaoUseCase = new ManutencaoUseCase(
  manutencaoRepositoryPrisma,
  usuarioRepositoryPrisma
);

import {
  manutencaoRepositoryPrisma,
  ManutencaoRepositoryPrisma,
} from "../../../repositories/prismaRepository/manutencao/manutencao.repository.prisma";
import {
  UsuarioRepositoryPrisma,
  usuarioRepositoryPrisma,
} from "../../../repositories/prismaRepository/usuario/usuario.repository.prisma";
import { QueryParamsBuscarManutencoes } from "../../../routes/manutencao/schemas/buscar-manutencoes.schema";
import {
  BadRequestError,
  ForbiddenError,
} from "../../../utils/helpers/api-error.helpers";
import { Payload } from "../../autenticacao/entity/autenticacao.entity";
import {
  TipoEditarManutencao,
  TipoManutencao,
  TipoManutencaoRecebidoNaCriacao,
} from "../entity/manutencao.entity";

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
  }: QueryParamsBuscarManutencoes & Partial<TipoManutencao>) => {
    const manutencoes =
      await this.manutencaoRepository.buscarManutencoesPorCondicao(
        filtrosAdicionais,
        complemento
      );

    return manutencoes;
  };

  _buscarManutencaoPorIdComFuncaoAuxiliar = async <T>(
    id: number,
    fun: (id: number) => T
  ) => {
    const manutencao = await fun(id);

    if (!manutencao) {
      throw new BadRequestError(
        "Manutenção com esse identificador não existe."
      );
    }

    return manutencao;
  };

  buscarPorIdComComplemento = async (id: number) => {
    const manutencao = await this._buscarManutencaoPorIdComFuncaoAuxiliar(
      id,
      this.manutencaoRepository.buscarManutencaoPorIdComComplemento
    );

    return manutencao;
  };

  buscarManutencoesParaTecnico = async (
    user: Payload,
    filtrosBusca: QueryParamsBuscarManutencoes
  ) => {
    const filtroPeloUsuario =
      user.role === "TECNICO"
        ? { tecnicoResponsavelId: user.userId }
        : { usuarioSolicitacaoId: user.userId };

    const manutencoes = await this.buscarManutencoes({
      ...filtrosBusca,
      ...filtroPeloUsuario,
    });

    return manutencoes;
  };

  _editarManutencaoBase = async (
    id: number,
    dataManutencao: TipoEditarManutencao
  ) => {
    await this._buscarManutencaoPorIdComFuncaoAuxiliar(id, (id) =>
      this.manutencaoRepository.existeManutencao({ id })
    );

    const manutencaoEditada = await this.manutencaoRepository.editarManutencao(
      id,
      dataManutencao
    );

    return manutencaoEditada;
  };

  editarManutencao = async (
    id: number,
    user: Payload,
    dataManutencao: TipoEditarManutencao
  ) => {
    const manutencao = await this._buscarManutencaoPorIdComFuncaoAuxiliar(
      id,
      this.manutencaoRepository.buscarManutencaoPorId
    );

    if (
      user.role === "PROFESSOR" &&
      manutencao.usuarioSolicitacaoId !== user.userId
    ) {
      throw new ForbiddenError(
        "O professor só pode editar uma manutenção que ele solicitou."
      );
    }

    const manutencaoEditada = await this.manutencaoRepository.editarManutencao(
      id,
      dataManutencao
    );

    return manutencaoEditada;
  };

  concluirManutencao = async (
    id: number,
    idTecnicoLogado: string,
    dataManutencao: TipoEditarManutencao
  ) => {
    const manutencao = await this._buscarManutencaoPorIdComFuncaoAuxiliar(
      id,
      this.manutencaoRepository.buscarManutencaoPorId
    );

    if (manutencao.tecnicoResponsavelId !== idTecnicoLogado) {
      throw new ForbiddenError(
        "Só quem pode concluir essa manutenção é o tecnico que foi demandado para ela."
      );
    }

    if (manutencao.status !== "SOLICITADA") {
      throw new BadRequestError(
        "Essa manutenção não pode ser concluida já que seu status não estar mais como SOLICITADA"
      );
    }

    const manutencaoEditada = await this._editarManutencaoBase(id, {
      ...dataManutencao,
      status: "CONCLUIDA",
    });

    return manutencaoEditada;
  };
}

export const manutencaoUseCase = new ManutencaoUseCase(
  manutencaoRepositoryPrisma,
  usuarioRepositoryPrisma
);

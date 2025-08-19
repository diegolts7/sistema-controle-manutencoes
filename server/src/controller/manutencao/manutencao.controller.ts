import { FastifyReply, FastifyRequest } from "fastify";
import {
  ManutencaoUseCase,
  manutencaoUseCase,
} from "../../core/manutencao/useCases/manutencao.use-case";
import {
  BuscarManutencoesRoute,
  ConcluirManutencaoRoute,
  CriarManutencaoRoute,
  EditarManutencaoRoute,
  ParamsIdRoute,
} from "./interface.manutencao.controller";
import { Payload } from "../../core/autenticacao/entity/autenticacao.entity";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import {
  bodyEditarManutencaoCoordenador,
  bodyEditarManutencaoProfessor,
} from "../../routes/manutencao/schemas/editar-manutencao.schema";

class ManutencaoController {
  constructor(private readonly manutencaoUseCase: ManutencaoUseCase) {}

  solicitar = async (
    request: FastifyRequest<CriarManutencaoRoute>,
    reply: FastifyReply
  ) => {
    const manutencao = request.body;
    const { userId } = request.user as Payload;

    const manutencaoCriada = await this.manutencaoUseCase.criarManutencao({
      ...manutencao,
      usuarioSolicitacaoId: userId,
    });

    reply.status(HTTP_STATUS.CREATED).send(manutencaoCriada);
  };

  buscar = async (
    request: FastifyRequest<BuscarManutencoesRoute>,
    reply: FastifyReply
  ) => {
    const { tipo, status, complemento } = request.query;

    const manutencoes = await this.manutencaoUseCase.buscarManutencoes({
      tipo,
      status,
      complemento,
    });

    reply.status(HTTP_STATUS.SUCCESS).send(manutencoes);
  };

  buscarPorId = async (
    request: FastifyRequest<ParamsIdRoute>,
    reply: FastifyReply
  ) => {
    const { idManutencao } = request.params;

    const manutencao = await this.manutencaoUseCase.buscarPorIdComComplemento(
      idManutencao
    );

    reply.status(HTTP_STATUS.SUCCESS).send(manutencao);
  };

  relacionadasAoUsuarioLogado = async (
    request: FastifyRequest<BuscarManutencoesRoute>,
    reply: FastifyReply
  ) => {
    const filtrosBusca = request.query;
    const user = request.user as Payload;

    const manutencoes =
      await this.manutencaoUseCase.buscarManutencoesParaTecnico(
        user,
        filtrosBusca
      );

    reply.status(HTTP_STATUS.SUCCESS).send(manutencoes);
  };

  editar = async (
    request: FastifyRequest<EditarManutencaoRoute>,
    reply: FastifyReply
  ) => {
    const payload = request.user as Payload;
    const { idManutencao } = request.params;

    const dataManutencao =
      payload.role === "COORDENADOR"
        ? bodyEditarManutencaoCoordenador.parse(request.body)
        : bodyEditarManutencaoProfessor.parse(request.body);

    const manutencaoEditada = await this.manutencaoUseCase.editarManutencao(
      idManutencao,
      payload,
      dataManutencao
    );

    reply.status(HTTP_STATUS.SUCCESS).send(manutencaoEditada);
  };

  concluir = async (
    request: FastifyRequest<ConcluirManutencaoRoute>,
    reply: FastifyReply
  ) => {
    const { descricaoAposFinalizada } = request.body;
    const { idManutencao } = request.params;
    const { userId } = request.user as Payload;

    const manutencaoEditada = await this.manutencaoUseCase.concluirManutencao(
      idManutencao,
      userId,
      { descricaoAposFinalizada }
    );

    reply.status(HTTP_STATUS.SUCCESS).send(manutencaoEditada);
  };

  cancelar = async (
    request: FastifyRequest<ParamsIdRoute>,
    reply: FastifyReply
  ) => {
    const { idManutencao } = request.params;
    const payload = request.user as Payload;

    const manutencaoDesativada =
      await this.manutencaoUseCase.cancelarManutencao(idManutencao, payload);

    reply.status(HTTP_STATUS.SUCCESS).send(manutencaoDesativada);
  };

  deletar = async (
    request: FastifyRequest<ParamsIdRoute>,
    reply: FastifyReply
  ) => {
    const { idManutencao } = request.params;

    await this.manutencaoUseCase.deletar(idManutencao);

    reply.status(HTTP_STATUS.SUCCESS).send();
  };
}

export const manutencaoController = new ManutencaoController(manutencaoUseCase);

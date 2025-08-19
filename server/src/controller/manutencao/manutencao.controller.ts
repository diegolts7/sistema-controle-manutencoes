import { FastifyReply, FastifyRequest } from "fastify";
import {
  ManutencaoUseCase,
  manutencaoUseCase,
} from "../../core/manutencao/useCases/manutencao.use-case";
import {
  BuscarManutencaoPorIdRoute,
  BuscarManutencoesRoute,
  CriarManutencaoRoute,
} from "./interface.manutencao.controller";
import { Payload } from "../../core/autenticacao/entity/autenticacao.entity";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";

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
    request: FastifyRequest<BuscarManutencaoPorIdRoute>,
    reply: FastifyReply
  ) => {
    const { idManutencao } = request.params;

    const manutencao = await this.manutencaoUseCase.buscarManutencaoPorId(
      idManutencao
    );

    reply.status(HTTP_STATUS.SUCCESS).send(manutencao);
  };

  buscarParaTecnico = async (
    request: FastifyRequest<BuscarManutencoesRoute>,
    reply: FastifyReply
  ) => {
    const filtrosBusca = request.query;
    const { userId } = request.user as Payload;

    const manutencoes =
      await this.manutencaoUseCase.buscarManutencoesParaTecnico(
        userId,
        filtrosBusca
      );

    reply.status(HTTP_STATUS.SUCCESS).send(manutencoes);
  };

  buscarSolicitadas = async (
    request: FastifyRequest<BuscarManutencoesRoute>,
    reply: FastifyReply
  ) => {
    const filtrosBusca = request.query;
    const { userId } = request.user as Payload;

    const manutencoes =
      await this.manutencaoUseCase.buscarManutencoesSolicitadas(
        userId,
        filtrosBusca
      );

    reply.status(HTTP_STATUS.SUCCESS).send(manutencoes);
  };
}

export const manutencaoController = new ManutencaoController(manutencaoUseCase);

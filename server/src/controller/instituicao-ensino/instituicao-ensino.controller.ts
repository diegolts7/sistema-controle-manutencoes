import { FastifyReply, FastifyRequest } from "fastify";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import {
  instituicaoEnsinoUseCase,
  InstituicaoEnsinoUseCase,
} from "../../core/instituicao-ensino/useCases/instituicao-ensino.use-case";
import {
  AtualizarInstituicaoRoute,
  BuscarIntituicaoPorIdRoute,
  CriarInstituicaoRoute,
} from "./interface.instituicao-ensino.controller";

class InstituicaoEnsinoController {
  constructor(private readonly useCase: InstituicaoEnsinoUseCase) {}

  criar = async (
    request: FastifyRequest<CriarInstituicaoRoute>,
    reply: FastifyReply
  ) => {
    const data = request.body;
    const instituicao = await this.useCase.criar(data);
    reply.status(HTTP_STATUS.CREATED).send(instituicao);
  };

  buscarPorId = async (
    request: FastifyRequest<BuscarIntituicaoPorIdRoute>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const instituicao = await this.useCase.buscarPorId(Number(id));

    reply.status(HTTP_STATUS.SUCCESS).send(instituicao);
  };

  listar = async (request: FastifyRequest, reply: FastifyReply) => {
    const instituicoes = await this.useCase.listar();
    reply.status(HTTP_STATUS.SUCCESS).send(instituicoes);
  };

  atualizar = async (
    request: FastifyRequest<AtualizarInstituicaoRoute>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const data = request.body;
    const instituicao = await this.useCase.atualizar(Number(id), data);
    reply.status(HTTP_STATUS.SUCCESS).send(instituicao);
  };

  deletar = async (
    request: FastifyRequest<BuscarIntituicaoPorIdRoute>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    await this.useCase.deletar(Number(id));

    reply.status(HTTP_STATUS.SUCCESS).send();
  };
}

export const instituicaoEnsinoController = new InstituicaoEnsinoController(
  instituicaoEnsinoUseCase
);

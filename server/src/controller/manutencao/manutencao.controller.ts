import { FastifyReply, FastifyRequest } from "fastify";
import {
  ManutencaoUseCase,
  manutencaoUseCase,
} from "../../core/manutencao/useCases/manutencao.use-case";
import { CriarManutencaoRoute } from "./interface.manutencao.controller";
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

    console.log(userId);

    const manutencaoCriada = await this.manutencaoUseCase.criarManutencao({
      ...manutencao,
      usuarioSolicitacaoId: userId,
    });

    reply.status(HTTP_STATUS.CREATED).send(manutencaoCriada);
  };
}

export const manutencaoController = new ManutencaoController(manutencaoUseCase);

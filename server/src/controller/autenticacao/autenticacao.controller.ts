import { FastifyReply, FastifyRequest } from "fastify";
import { ConteudoLogin } from "../../routes/autenticacao/schemas/login.schema";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import {
  autenticacaoUseCase,
  AutenticacaoUseCase,
} from "../../core/autenticacao/useCases/autenticacao.use-case";
import { ConteudoVerificarToken } from "../../routes/autenticacao/schemas/verificar-token.schema";
import { verificarSeTokenEhValido } from "../../middlewares/auth/verificar-token";
import { ConteudoAtualizarToken } from "../../routes/autenticacao/schemas/atualizar-token.schema";

class AutenticacaoController {
  constructor(private readonly autenticacaoUseCase: AutenticacaoUseCase) {}

  login = async (
    request: FastifyRequest<{
      Body: ConteudoLogin;
    }>,
    reply: FastifyReply
  ) => {
    const { email, senha } = request.body;

    const tokens = await this.autenticacaoUseCase.login({ email, senha });

    reply.status(HTTP_STATUS.SUCCESS).send(tokens);
  };

  verificarToken = async (
    request: FastifyRequest<{ Body: ConteudoVerificarToken }>,
    reply: FastifyReply
  ) => {
    const { access } = request.body;

    await verificarSeTokenEhValido(access);

    reply.status(HTTP_STATUS.SUCCESS).send();
  };

  atualizarToken = async (
    request: FastifyRequest<{ Body: ConteudoAtualizarToken }>,
    reply: FastifyReply
  ) => {
    const { refresh } = request.body;

    const novosTokens = await this.autenticacaoUseCase.atualizarToken(refresh);

    reply.status(HTTP_STATUS.SUCCESS).send(novosTokens);
  };
}

export const autenticacaoController = new AutenticacaoController(
  autenticacaoUseCase
);

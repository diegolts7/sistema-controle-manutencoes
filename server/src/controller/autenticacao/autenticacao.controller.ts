import { FastifyReply, FastifyRequest } from "fastify";
import { ConteudoLogin } from "../../routes/autenticacao/schemas/login.schema";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import {
  autenticacaoUseCase,
  AutenticacaoUseCase,
} from "../../core/autenticacao/useCases/autenticacao.use-case";

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

  verificarToken = async (request: FastifyRequest, reply: FastifyReply) => {};

  atualizarToken = async (request: FastifyRequest, reply: FastifyReply) => {};
}

export const autenticacaoController = new AutenticacaoController(
  autenticacaoUseCase
);

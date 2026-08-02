import { FastifyReply, FastifyRequest } from "fastify";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import {
  autenticacaoUseCase,
  AutenticacaoUseCase,
} from "../../core/autenticacao/useCases/autenticacao.use-case";
import { verificarSeTokenEhValido } from "../../middlewares/auth/verificar-token";
import {
  AtualizarTokenRoute,
  LoginRoute,
  VerificarTokenRoute,
} from "./interface.autenticacao.controller";
import {
  UsuarioUseCase,
  usuarioUseCase,
} from "../../core/usuario/useCases/usuario.use-case";
import { Payload } from "../../core/autenticacao/entity/autenticacao.entity";

class AutenticacaoController {
  constructor(
    private readonly autenticacaoUseCase: AutenticacaoUseCase,
    private readonly usuarioUseCase: UsuarioUseCase
  ) {}

  login = async (request: FastifyRequest<LoginRoute>, reply: FastifyReply) => {
    const { email, senha } = request.body;

    const tokens = await this.autenticacaoUseCase.login({ email, senha });

    reply.status(HTTP_STATUS.SUCCESS).send(tokens);
  };

  verificarToken = async (
    request: FastifyRequest<VerificarTokenRoute>,
    reply: FastifyReply
  ) => {
    const { access } = request.body;

    await verificarSeTokenEhValido(access);

    reply.status(HTTP_STATUS.SUCCESS).send();
  };

  atualizarToken = async (
    request: FastifyRequest<AtualizarTokenRoute>,
    reply: FastifyReply
  ) => {
    const { refresh } = request.body;

    const novosTokens = await this.autenticacaoUseCase.atualizarToken(refresh);

    reply.status(HTTP_STATUS.SUCCESS).send(novosTokens);
  };

  buscarUsuarioLogado = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { userId } = request.user as Payload;

    const usuarioLogado = await this.usuarioUseCase.buscarUsuarioPorId(userId);

    reply.status(HTTP_STATUS.SUCCESS).send(usuarioLogado);
  };
}

export const autenticacaoController = new AutenticacaoController(
  autenticacaoUseCase,
  usuarioUseCase
);

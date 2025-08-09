import { FastifyReply, FastifyRequest } from "fastify";
import {
  UsuarioUseCase,
  usuarioUseCase,
} from "../../core/usuario/useCases/usuario.use-case";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import {
  BuscarUsuariosRoute,
  CriarUsuarioRoute,
} from "./interface.usuario.controller";

class UsuarioController {
  constructor(private readonly usuarioUseCase: UsuarioUseCase) {}

  criarUsuario = async (
    request: FastifyRequest<CriarUsuarioRoute>,
    reply: FastifyReply
  ) => {
    const usuario = request.body;

    const usuarioCriado = await this.usuarioUseCase.criarUsuario(usuario);

    reply.status(HTTP_STATUS.CREATED).send(usuarioCriado);
  };

  buscarUsuarios = async (
    request: FastifyRequest<BuscarUsuariosRoute>,
    reply: FastifyReply
  ) => {
    const { search } = request.query;

    const usuarios = await this.usuarioUseCase.buscarUsuarios(search);

    reply.status(HTTP_STATUS.SUCCESS).send(usuarios);
  };
}

export const usuarioController = new UsuarioController(usuarioUseCase);

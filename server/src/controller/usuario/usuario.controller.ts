import { FastifyReply, FastifyRequest } from "fastify";
import {
  UsuarioUseCase,
  usuarioUseCase,
} from "../../core/usuario/useCases/usuario.use-case";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import {
  BuscarUsuarioPorIdRoute,
  BuscarUsuariosRoute,
  CriarUsuarioRoute,
  EditarUsuarioRoute,
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

  buscarUsuarioPorId = async (
    request: FastifyRequest<BuscarUsuarioPorIdRoute>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const usuario = await this.usuarioUseCase.buscarUsuarioPorId(id);

    reply.status(HTTP_STATUS.SUCCESS).send(usuario);
  };

  buscarUsuarios = async (
    request: FastifyRequest<BuscarUsuariosRoute>,
    reply: FastifyReply
  ) => {
    const { search, inativos } = request.query;

    const usuarios = await this.usuarioUseCase.buscarUsuarios(search, inativos);

    reply.status(HTTP_STATUS.SUCCESS).send(usuarios);
  };

  editarUsuario = async (
    request: FastifyRequest<EditarUsuarioRoute>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const data = request.body;

    const usuario = await this.usuarioUseCase.editarUsuario(id, data);

    reply.status(HTTP_STATUS.SUCCESS).send(usuario);
  };
}

export const usuarioController = new UsuarioController(usuarioUseCase);

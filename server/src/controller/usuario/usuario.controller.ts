import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import {
  UsuarioUseCase,
  usuarioUseCase,
} from "../../core/usuario/useCases/usuario.use-case";
import { QueryBuscarUsuarios } from "../../routes/usuario/schemas/buscar-usuarios.schema";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";

interface BuscarUsuariosRoute extends RouteGenericInterface {
  Querystring: QueryBuscarUsuarios;
}

class UsuarioController {
  constructor(private readonly usuarioUseCase: UsuarioUseCase) {}

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

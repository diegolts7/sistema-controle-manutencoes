import { FastifyReply, FastifyRequest } from "fastify";
import { CargoEnum } from "../../core/usuario/entity/usuario.entity";
import { Payload } from "../../core/autenticacao/entity/autenticacao.entity";
import { ForbiddenError } from "../../utils/helpers/api-error.helpers";

export const verificarCargoMiddleware =
  (cargosPermitidos: CargoEnum[]) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (request: FastifyRequest, _reply: FastifyReply) => {
    const { role } = request.user as Payload;

    if (!role || !cargosPermitidos.includes(role)) {
      throw new ForbiddenError(
        "Usuario não tem o cargo necessário para acessar a informação."
      );
    }
  };

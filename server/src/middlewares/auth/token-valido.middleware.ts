import { FastifyReply, FastifyRequest } from "fastify";
import { verificarSeTokenEhValido } from "./verificar-token";
import { UnauthorizedError } from "../../utils/helpers/api-error.helpers";

export const tokenValidoMiddleware = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
  const token = request.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new UnauthorizedError("Token não fornecido");
  }

  const { userId } = await verificarSeTokenEhValido(token);

  request.user = userId;
};

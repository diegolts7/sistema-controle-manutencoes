import { FastifyReply, FastifyRequest } from "fastify";
import { verificarSeTokenEhValido } from "./verificar-token";
import { UnauthorizedError } from "../../utils/helpers/api-error.helpers";

export const tokenValidoMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new UnauthorizedError("Token não fornecido");
  }

  const payload = await verificarSeTokenEhValido(token);

  request.user = payload;
  return;
};

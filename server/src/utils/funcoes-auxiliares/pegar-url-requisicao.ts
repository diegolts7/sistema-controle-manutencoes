import { FastifyRequest } from "fastify";

export const pegarUrlDaRequisicao = (request: FastifyRequest) => {
  return `${request.protocol}://${request.hostname}:${request.socket.localPort}`;
};

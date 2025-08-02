import { FastifyReply, FastifyRequest } from "fastify";

class AutenticacaoController {
  constructor() {}

  login = async (request: FastifyRequest, reply: FastifyReply) => {};

  verificarToken = async (request: FastifyRequest, reply: FastifyReply) => {};

  atualizarToken = async (request: FastifyRequest, reply: FastifyReply) => {};
}

export const autenticacaoController = new AutenticacaoController();

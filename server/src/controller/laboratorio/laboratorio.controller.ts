import { FastifyReply, FastifyRequest } from "fastify";
import { LaboratorioUseCase } from "../../core/laboratorio/useCases/laboratorio.use-case";
import { laboratorioRepositoryPrisma } from "../../repositories/prismaRepository/laboratorio/laboratorio.repository.prisma";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import { NotFoundError } from "../../utils/helpers/api-error.helpers";

const laboratorioUseCase = new LaboratorioUseCase(laboratorioRepositoryPrisma);

class LaboratorioController {
  criar = async (request: FastifyRequest, reply: FastifyReply) => {
    const novoLaboratorio = await laboratorioUseCase.criar(request.body as any);

    console.log(novoLaboratorio);

    return reply.status(HTTP_STATUS.CREATED).send(novoLaboratorio);
  };

  listar = async (request: FastifyRequest, reply: FastifyReply) => {
    const laboratorios = await laboratorioUseCase.listar();

    return reply.status(HTTP_STATUS.SUCCESS).send(laboratorios);
  };

  detalhar = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const laboratorio = await laboratorioUseCase.detalhar(id);

    if (!laboratorio) {
      throw new NotFoundError(`Laboratório com ID ${id} não encontrado.`);
    }

    return reply.status(HTTP_STATUS.SUCCESS).send(laboratorio);
  };

  editar = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const laboratorioAtualizado = await laboratorioUseCase.editar(
      id,
      request.body as any
    );

    return reply.status(HTTP_STATUS.SUCCESS).send(laboratorioAtualizado);
  };

  deletar = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    await laboratorioUseCase.deletar(id);

    return reply.status(HTTP_STATUS.SUCCESS).send();
  };
}

export const laboratorioController = new LaboratorioController();

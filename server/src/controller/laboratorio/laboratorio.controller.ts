import { FastifyReply, FastifyRequest } from "fastify";
import { LaboratorioUseCase } from "../../core/laboratorio/useCases/laboratorio.use-case";
import { laboratorioRepositoryPrisma } from "../../repositories/prismaRepository/laboratorio/laboratorio.repository.prisma";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import { NotFoundError } from "../../utils/helpers/api-error.helpers";
import { Laboratorio } from "@prisma/client";
import { TipoLaboratorioPublico } from "../../core/laboratorio/entity/laboratorio.entity";

const paraLaboratorioPublico = (lab: Laboratorio): TipoLaboratorioPublico => {
  return {
    id: lab.id,
    nome: lab.nome,
    descricao: lab.descricao,
    responsavelId: lab.responsavelId,
    createdAt: lab.createdAt,
    updatedAt: lab.updatedAt,
  };
};

const laboratorioUseCase = new LaboratorioUseCase(laboratorioRepositoryPrisma);

class LaboratorioController {
  criar = async (request: FastifyRequest, reply: FastifyReply) => {
    const novoLaboratorio = await laboratorioUseCase.criar(request.body as any);
    return reply.status(HTTP_STATUS.CREATED).send(paraLaboratorioPublico(novoLaboratorio));
  };

  listar = async (_request: FastifyRequest, reply: FastifyReply) => {
    const laboratorios = await laboratorioUseCase.listar();
    const laboratoriosPublicos = laboratorios.map(paraLaboratorioPublico);
    return reply.status(HTTP_STATUS.SUCCESS).send(laboratoriosPublicos);
  };

  detalhar = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const laboratorio = await laboratorioUseCase.detalhar(id);

    if (!laboratorio) {
      throw new NotFoundError(`Laboratório com ID ${id} não encontrado.`);
    }
    return reply.status(HTTP_STATUS.SUCCESS).send(paraLaboratorioPublico(laboratorio));
  };

  editar = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const laboratorioAtualizado = await laboratorioUseCase.editar(id, request.body as any);
    return reply.status(HTTP_STATUS.SUCCESS).send(paraLaboratorioPublico(laboratorioAtualizado));
  };

  deletar = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    await laboratorioUseCase.deletar(id);
    return reply.status(HTTP_STATUS.SUCCESS).send();
  };
}

export const laboratorioController = new LaboratorioController();

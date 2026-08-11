import { Prisma } from "@prisma/client";
import { TipoCriarLaboratorio, TipoEditarLaboratorio } from "../entity/laboratorio.entity";
import{ LaboratorioRepositoryPrisma } from "../../../repositories/prismaRepository/laboratorio/laboratorio.repository.prisma";
import { BadRequestError } from "../../../utils/helpers/api-error.helpers";


export class LaboratorioUseCase {
    constructor(private readonly laboratorioRepository: LaboratorioRepositoryPrisma) {}

    criar = async (data: TipoCriarLaboratorio) => {
 
    const laboratorioExistente = await this.laboratorioRepository.buscarPorNome(
      data.nome
    );
    if (laboratorioExistente) {
      throw new BadRequestError("Já existe um laboratório com este nome.");
    }

    return await this.laboratorioRepository.criar(data);
  };
    listar = async () => {
        return await this.laboratorioRepository.buscarTodos();
    };

    detalhar = async (id: number) => {
        return await this.laboratorioRepository.buscarPorId(id);
    };

    editar = async (id: number, data: TipoEditarLaboratorio) => {
        return await this.laboratorioRepository.editar(id, data);
    };

    deletar = async (id: number) => {
        try {
            return await this.laboratorioRepository.deletar(id);
        } catch (erro) {
            const ehViolacaoDeChaveEstrangeira =
                (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === "P2003") ||
                (erro instanceof Error && erro.message.includes("foreign key constraint"));

            if (ehViolacaoDeChaveEstrangeira) {
                throw new BadRequestError(
                    "Não é possível excluir um laboratório que possui manutenções vinculadas."
                );
            }
            throw erro;
        }
    };
}
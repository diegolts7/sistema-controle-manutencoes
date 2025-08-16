import { TipoCriarLaboratorio, TipoEditarLaboratorio } from "../entity/laboratorio.entity";
import{ LaboratorioRepositoryPrisma } from "../../../repositories/prismaRepository/laboratorio/laboratorio.repository.prisma";

export class LaboratorioUseCase {
    constructor(private readonly laboratorioRepository: LaboratorioRepositoryPrisma) {}

    criar = async (data: TipoCriarLaboratorio) => {
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
        return await this.laboratorioRepository.deletar(id);
    };
}
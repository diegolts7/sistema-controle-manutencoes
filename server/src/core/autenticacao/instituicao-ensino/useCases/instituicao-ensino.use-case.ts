import {
  BadRequestError,
  NotFoundError,
} from "../../../../utils/helpers/api-error.helpers";
import {
  instituicaoEnsinoRepositoryPrisma,
  InstituicaoEnsinoRepositoryPrisma,
} from "../../../../repositories/prismaRepository/instituicao-ensino/instituicao-ensino.repository.prisma";
import { InstituicaoEnsinoDTO, InstituicaoEnsinoUpdateDTO } from "../../../../routes/instituicao-ensino/schemas/instituicao-ensino.schema";

export class InstituicaoEnsinoUseCase {
  constructor(private readonly repository: InstituicaoEnsinoRepositoryPrisma) {}

  async criar(data: InstituicaoEnsinoDTO) {
    const instituicaoExistente = await this.repository.buscarPorCnpj(data.cnpj);
    if (instituicaoExistente) {
      throw new BadRequestError("Já existe uma instituição com este CNPJ");
    }
    return await this.repository.criar(data);
  }

  async buscarPorId(id: number) {
    const instituicao = await this.repository.buscarPorId(id);
    if (!instituicao) {
      throw new NotFoundError("Instituição não encontrada");
    }
    return instituicao;
  }

  async listar() {
    return await this.repository.listar();
  }

  async atualizar(id: number, data: InstituicaoEnsinoUpdateDTO) {
    await this.buscarPorId(id); // Verifica se existe
    return await this.repository.atualizar(id, data);
  }

  async deletar(id: number) {
    await this.buscarPorId(id); // Verifica se existe
    await this.repository.deletar(id);
  }
}

export const instituicaoEnsinoUseCase = new InstituicaoEnsinoUseCase(
  instituicaoEnsinoRepositoryPrisma
);
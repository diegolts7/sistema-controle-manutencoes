import {
  imagemManutencaoRepositoryPrisma,
  ImagemManutencaoRepositoryPrisma,
} from "../../../repositories/prismaRepository/imagem-manutencao/imagem-manutencao.repository.prisma";
import {
  manutencaoUseCase,
  ManutencaoUseCase,
} from "../../manutencao/useCases/manutencao.use-case";
import { localStorageService } from "../../../services/local-storage/local-storage-service";
import { randomUUID } from "crypto";
import { extname } from "path";
import { MultipartFile } from "@fastify/multipart";

export class ImagemManutencaoUseCase {
  constructor(
    private readonly imagemManutencaoRepository: ImagemManutencaoRepositoryPrisma,
    private readonly manutencaoUseCase: ManutencaoUseCase
  ) {}

  upload = async (
    idManutencao: number,
    files: AsyncIterableIterator<MultipartFile>
  ) => {
    await this.manutencaoUseCase.verificarSeManutencaoExisteOuErro(
      idManutencao
    );

    const promisesFilesStream = [];

    for await (const file of files) {
      const filename = randomUUID() + extname(file.filename);
      promisesFilesStream.push(localStorageService.upload(file, filename));
    }

    const imagensUpadas = await Promise.all(promisesFilesStream);

    const imagensManutencoesFormatadas = imagensUpadas.map((i) => {
      return {
        nome: i.filename,
        mimetype: i.mimetype,
        manutencaoId: idManutencao,
      };
    });

    return await this.imagemManutencaoRepository.criarVarias(
      imagensManutencoesFormatadas
    );
  };
}

export const imagemManutencaoUseCase = new ImagemManutencaoUseCase(
  imagemManutencaoRepositoryPrisma,
  manutencaoUseCase
);

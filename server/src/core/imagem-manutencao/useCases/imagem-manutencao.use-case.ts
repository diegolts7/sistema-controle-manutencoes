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
import { FastifyRequest } from "fastify";
import { pegarUrlDaRequisicao } from "../../../utils/funcoes-auxiliares/pegar-url-requisicao";
import { CAMINHO_PARA_ARQUIVOS_NA_API } from "../../../utils/constantes/arquivos-locais.utils";
import {
  BadRequestError,
  NotFoundError,
} from "../../../utils/helpers/api-error.helpers";

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
      const nomeFormatado = randomUUID() + extname(file.filename);
      promisesFilesStream.push(localStorageService.upload(file, nomeFormatado));
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

  buscarImagensDeUmaManutencao = async (
    idManutencao: number,
    request: FastifyRequest
  ) => {
    await this.manutencaoUseCase.verificarSeManutencaoExisteOuErro(
      idManutencao
    );

    const imagensEncontradas =
      await this.imagemManutencaoRepository.buscarPorCondicao({
        manutencaoId: idManutencao,
      });

    const imagensFormatadas = imagensEncontradas.map((i) => {
      return {
        ...i,
        url:
          pegarUrlDaRequisicao(request) + CAMINHO_PARA_ARQUIVOS_NA_API + i.nome,
      };
    });

    return imagensFormatadas;
  };

  editarImagem = async (idImagem: number, request: FastifyRequest) => {
    const file = await request.file();

    if (!file) {
      throw new BadRequestError("Nenhuma imagem foi passada");
    }

    const imagem = await this.imagemManutencaoRepository.buscarPorId(idImagem);

    if (!imagem) {
      throw new NotFoundError("Imagem com esse id não foi encontrada");
    }

    const imagemUpadaAtualizada = await localStorageService.upload(
      file,
      imagem.nome
    );

    const imagemAtualizadaNoBanco =
      await this.imagemManutencaoRepository.atualizar(idImagem, {
        mimetype: imagemUpadaAtualizada.mimetype,
      });

    return {
      ...imagemAtualizadaNoBanco,
      url:
        pegarUrlDaRequisicao(request) +
        CAMINHO_PARA_ARQUIVOS_NA_API +
        imagemUpadaAtualizada.filename,
    };
  };

  deletarImagem = async (idImagem: number) => {
    const imagem = await this.imagemManutencaoRepository.buscarPorId(idImagem);

    if (!imagem) {
      throw new NotFoundError("Imagem com esse id não foi encontrada");
    }

    await localStorageService.remove(imagem.nome);

    const imagemDeletadaNoBanco = await this.imagemManutencaoRepository.deletar(
      idImagem
    );

    return imagemDeletadaNoBanco;
  };
}

export const imagemManutencaoUseCase = new ImagemManutencaoUseCase(
  imagemManutencaoRepositoryPrisma,
  manutencaoUseCase
);

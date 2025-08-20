import { FastifyReply, FastifyRequest } from "fastify";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import { ParamsIdRoute } from "../manutencao/interface.manutencao.controller";
import {
  imagemManutencaoUseCase,
  ImagemManutencaoUseCase,
} from "../../core/imagem-manutencao/useCases/imagem-manutencao.use-case";
import { TAMANHO_ARQUIVO_MAXIMO_5MB } from "../../utils/constantes/arquivos-locais.utils";
import { ParamsIdImagemManutencaoRoute } from "./interface.imagem-manutencao.controller";

class ImagemManutencaoController {
  constructor(
    private readonly imagemManutencaoUseCase: ImagemManutencaoUseCase
  ) {}

  upload = async (
    request: FastifyRequest<ParamsIdRoute>,
    reply: FastifyReply
  ) => {
    const { idManutencao } = request.params;
    const files = request.files({
      limits: {
        fileSize: TAMANHO_ARQUIVO_MAXIMO_5MB,
      },
    });

    const imagensUpadas = await this.imagemManutencaoUseCase.upload(
      idManutencao,
      files
    );

    reply.status(HTTP_STATUS.CREATED).send(imagensUpadas);
  };

  buscarDeUmaManutencao = async (
    request: FastifyRequest<ParamsIdRoute>,
    reply: FastifyReply
  ) => {
    const { idManutencao } = request.params;

    const imagensEncontradas =
      await this.imagemManutencaoUseCase.buscarImagensDeUmaManutencao(
        idManutencao,
        request
      );

    reply.status(HTTP_STATUS.CREATED).send(imagensEncontradas);
  };

  editar = async (
    request: FastifyRequest<ParamsIdImagemManutencaoRoute>,
    reply: FastifyReply
  ) => {
    const { idImagem } = request.params;

    const imagensEncontradas = await this.imagemManutencaoUseCase.editarImagem(
      idImagem,
      request
    );

    reply.status(HTTP_STATUS.CREATED).send(imagensEncontradas);
  };

  deletar = async (
    request: FastifyRequest<ParamsIdImagemManutencaoRoute>,
    reply: FastifyReply
  ) => {
    const { idImagem } = request.params;

    await this.imagemManutencaoUseCase.deletarImagem(idImagem);

    reply.status(HTTP_STATUS.CREATED).send();
  };
}

export const imagemManutencaoController = new ImagemManutencaoController(
  imagemManutencaoUseCase
);

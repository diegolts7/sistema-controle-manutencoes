import { FastifyReply, FastifyRequest } from "fastify";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";
import { ParamsIdRoute } from "../manutencao/interface.manutencao.controller";
import {
  imagemManutencaoUseCase,
  ImagemManutencaoUseCase,
} from "../../core/imagem-manutencao/useCases/imagem-manutencao.use-case";
import { TAMANHO_ARQUIVO_MAXIMO_5MB } from "../../utils/constantes/arquivos-locais.utils";

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
}

export const imagemManutencaoController = new ImagemManutencaoController(
  imagemManutencaoUseCase
);

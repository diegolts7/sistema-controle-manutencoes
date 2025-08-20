import { constants, createWriteStream, mkdirSync, statSync } from "fs";
import { access } from "fs/promises";
import { join } from "path";
import { pipeline } from "stream/promises";
import { CAMINHO_PARA_SALVAR_ARQUIVOS_LOCAIS } from "../../utils/constantes/arquivos-locais.utils";
import { MultipartFile } from "@fastify/multipart";

export class LocalStorageService {
  constructor(private readonly dirStorage: string) {}

  upload = async (arquivo: MultipartFile, filename: string) => {
    this.createInitialDirIfNotExist();

    const caminhoParaArquivo = join(this.dirStorage, filename);

    await pipeline(arquivo.file, createWriteStream(caminhoParaArquivo));

    return {
      filename,
      caminho: caminhoParaArquivo,
      mimetype: arquivo.mimetype,
    };
  };

  //   remove = async (filename: string) => {};

  fileExistInInitialDir = async (filename: string): Promise<boolean> => {
    try {
      await access(join(this.dirStorage, filename), constants.F_OK);
      return true;
    } catch {
      return false;
    }
  };

  createInitialDirIfNotExist = async () => {
    try {
      const existDir = statSync(this.dirStorage);

      if (!existDir.isDirectory()) {
        mkdirSync(this.dirStorage, { recursive: true });
      }
    } catch {
      mkdirSync(this.dirStorage, { recursive: true });
    }
  };
}

export const localStorageService = new LocalStorageService(
  CAMINHO_PARA_SALVAR_ARQUIVOS_LOCAIS
);

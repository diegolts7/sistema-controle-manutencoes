import { join } from "path";

export const CAMINHO_PARA_SALVAR_ARQUIVOS_LOCAIS = join(
  process.cwd(),
  "storage"
);

export const CAMINHO_PARA_ARQUIVOS_NA_API = "/api/uploads/";

export const TAMANHO_ARQUIVO_MAXIMO_5MB = 5 * 1024 * 1024;

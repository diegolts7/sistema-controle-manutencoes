import bcrypt from "bcrypt";

export class BcryptService {
  private readonly SALT_SENHA_PADRAO = 10;
  constructor() {}

  compararSenhas = async (senha: string, senhaHash: string) => {
    return bcrypt.compare(senha, senhaHash);
  };

  gerarHashSenha = async (
    senha: string,
    salt: number = this.SALT_SENHA_PADRAO
  ) => {
    return bcrypt.hash(senha, salt);
  };
}

export const bcryptService = new BcryptService();

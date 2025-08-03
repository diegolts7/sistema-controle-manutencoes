import { ConteudoLogin } from "../../../routes/autenticacao/schemas/login.schema";
import {
  BadRequestError,
  NotFoundError,
} from "../../../utils/helpers/api-error.helpers";
import {
  usuarioRepositoryPrisma,
  UsuarioRepositoryPrisma,
} from "../../../repositories/prismaRepository/usuario/usuario.repository.prisma";
import bcrypt from "bcrypt";
import app from "../../../routes/route";
import { Payload } from "../entity/autenticacao.entity";

export class AutenticacaoUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPrisma) {}

  login = async ({ email, senha }: ConteudoLogin) => {
    const usuario = await this.usuarioRepository.buscarPorEmail(email);

    if (!usuario) {
      throw new NotFoundError("usuario nao existe, cadastre-se!");
    }

    const checkPassword = await bcrypt.compare(senha, usuario.senha);

    if (!checkPassword) {
      throw new BadRequestError("A senha está incorreta, tente outra vez.");
    }

    const tokens = this.createTokens({
      userId: usuario.idExterno,
    });

    return tokens;
  };

  createTokens = (payload: Payload) => {
    const access = app.jwt.sign(payload, { expiresIn: "30m" });
    const refresh = app.jwt.sign(payload, { expiresIn: "7d" });

    return { access, refresh };
  };
}

export const autenticacaoUseCase = new AutenticacaoUseCase(
  usuarioRepositoryPrisma
);

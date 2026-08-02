import { Payload } from "../../core/autenticacao/entity/autenticacao.entity";
import app from "../../routes/route";
import { UnauthorizedError } from "../../utils/helpers/api-error.helpers";

export const verificarSeTokenEhValido = async (
  token: string
): Promise<Payload> => {
  try {
    return await app.jwt.verify(token);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    throw new UnauthorizedError("Token inválido ou ausente");
  }
};

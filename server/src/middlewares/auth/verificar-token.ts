import { Payload } from "../../core/autenticacao/entity/autenticacao.entity";
import app from "../../routes/route";
import { UnauthorizedError } from "../../utils/helpers/api-error.helpers";

export const verificarSeTokenEhValido = async (
  token: string
): Promise<Payload> => {
  try {
    return app.jwt.verify(token);
  } catch (err) {
    throw new UnauthorizedError("Token inválido ou ausente");
  }
};

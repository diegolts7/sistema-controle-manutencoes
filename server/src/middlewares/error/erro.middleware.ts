import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "../../utils/helpers/api-error.helpers";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";

export const errorMiddleware = (
  error: Error & Partial<ApiError> & { validation?: any },
  _req: FastifyRequest,
  reply: FastifyReply
) => {
  if (error.validation) {
    const errosSemOCaminho = error.validation.reduce(
      (acc: Record<string, string>, err: any) => {
        if (err.instancePath) {
          const field = err.instancePath.replace("/", "");
          acc[field] = err.message;
        }
        return acc;
      },
      {}
    );

    return reply
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ errors: errosSemOCaminho });
  }

  const statusCode = error.statusCode ?? HTTP_STATUS.INTERNAL_ERROR;
  const message = error.statusCode ? error.message : "Erro interno do servidor";

  return reply.code(statusCode).send({ message });
};

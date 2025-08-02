import { HTTP_STATUS } from "../constantes/status-requisicao.utils";

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Requisição inválida") {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Não autorizado") {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Recurso não encontrado") {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}

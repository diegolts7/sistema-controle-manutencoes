import { FastifyReply, FastifyRequest } from "fastify";
import {
  DashboardUseCase,
  dashboardUseCase,
} from "../../core/dashboard/useCases/dashboard.use-case";
import { HTTP_STATUS } from "../../utils/constantes/status-requisicao.utils";

class DashboardController {
  constructor(private readonly dashboardUseCase: DashboardUseCase) {}

  buscarMetricas = async (_request: FastifyRequest, reply: FastifyReply) => {
    const metricas = await this.dashboardUseCase.buscarMetricas();

    reply.status(HTTP_STATUS.SUCCESS).send(metricas);
  };
}

export const dashboardController = new DashboardController(dashboardUseCase);

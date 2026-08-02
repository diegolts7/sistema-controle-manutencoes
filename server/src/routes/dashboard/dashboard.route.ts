import { CargoEnum } from "@prisma/client";
import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { dashboardController } from "../../controller/dashboard/dashboard.controller";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { verificarCargoMiddleware } from "../../middlewares/cargo/verificar-cargo.middleware";
import { buscarDashboardFastifySchema } from "./schemas/dashboard.schema";

export const dashboardRotas = (app: FastifyTypedInstance) => {
  app.get(
    "/",
    {
      schema: buscarDashboardFastifySchema,
      preHandler: [tokenValidoMiddleware, verificarCargoMiddleware([CargoEnum.COORDENADOR])],
    },
    dashboardController.buscarMetricas,
  );
};

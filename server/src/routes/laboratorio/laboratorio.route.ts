import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { laboratorioController } from "../../controller/laboratorio/laboratorio.controller";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { criarLaboratorioFastifySchema, deletarLaboratorioFastifySchema, detalharLaboratorioFastifySchema, editarLaboratorioFastifySchema, listarLaboratoriosFastifySchema } from "./schemas/laboratorio.schema";

export const laboratorioRotas = (app: FastifyTypedInstance) => {
    app.addHook("preHandler", tokenValidoMiddleware);

    app.post("/", { schema: criarLaboratorioFastifySchema }, laboratorioController.criar);
    app.get("/", { schema: listarLaboratoriosFastifySchema }, laboratorioController.listar);
    app.get("/:id", { schema: detalharLaboratorioFastifySchema }, laboratorioController.detalhar);
    app.put("/:id", { schema: editarLaboratorioFastifySchema }, laboratorioController.editar);
    app.delete("/:id", { schema: deletarLaboratorioFastifySchema }, laboratorioController.deletar);
};
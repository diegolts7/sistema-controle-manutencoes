import { FastifyTypedInstance } from "../../@types/fastify/fastify.types";
import { tokenValidoMiddleware } from "../../middlewares/auth/token-valido.middleware";
import { verificarCargoMiddleware } from "../../middlewares/cargo/verificar-cargo.middleware";
import { imagemManutencaoController } from "../../controller/imagem-manutencao/imagem-manutencao.controller";
import { uparImagensManutencaoSchema } from "./schemas/upar-imagem.schema";
import { buscarImagensManutencaoSchema } from "./schemas/buscar-imagens-de-manutencao.schema";
import { atualizarImagemManutencaoSchema } from "./schemas/atualizar-imagem.schema";
import { deletarImagemManutencaoSchema } from "./schemas/deletar-imagem-manutencao.schema";

export const imagemManutencaoRotas = (app: FastifyTypedInstance) => {
  app.post(
    "/manutencao/:idManutencao",
    {
      schema: uparImagensManutencaoSchema,
      preHandler: [verificarCargoMiddleware(["COORDENADOR", "TECNICO"])],
    },
    imagemManutencaoController.upload
  );

  app.get(
    "/manutencao/:idManutencao",
    {
      schema: buscarImagensManutencaoSchema,
      preHandler: tokenValidoMiddleware,
    },
    imagemManutencaoController.buscarDeUmaManutencao
  );

  app.patch(
    "/:idImagem/manutencao",
    {
      schema: atualizarImagemManutencaoSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR", "TECNICO"]),
      ],
    },
    imagemManutencaoController.editar
  );

  app.delete(
    "/:idImagem/manutencao",
    {
      schema: deletarImagemManutencaoSchema,
      preHandler: [
        tokenValidoMiddleware,
        verificarCargoMiddleware(["COORDENADOR", "TECNICO"]),
      ],
    },
    imagemManutencaoController.deletar
  );
};

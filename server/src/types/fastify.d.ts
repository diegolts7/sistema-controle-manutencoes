import "fastify";
import { Payload } from "../core/autenticacao/entity/autenticacao.entity";

declare module "fastify" {
  interface FastifyRequest {
    user: Payload;
  }
}

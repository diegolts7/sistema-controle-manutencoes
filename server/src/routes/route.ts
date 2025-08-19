import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { autenticacaoRotas } from "./autenticacao/autenticacao.route";
import { instituicaoEnsinoRotas } from "./instituicao-ensino/instituicao-ensino.route";
import { errorMiddleware } from "../middlewares/error/erro.middleware";
import fastifyJwt from "@fastify/jwt";
import { usuarioRotas } from "./usuario/usuario.route";
import { manutencaoRotas } from "./manutencao/manutencao.route";

const app = fastify({
  logger: true,
});

app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.withTypeProvider<ZodTypeProvider>();

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API Manutenções",
      description:
        "API de gerenciamento e controle de manutenções para os equipamentos e maquinas do IFPB Cajázeiras.",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/api/docs",
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
});

const routes = () => {
  app.register(autenticacaoRotas, { prefix: "/auth" });
  app.register(instituicaoEnsinoRotas, { prefix: "/instituicao-ensino" });
  app.register(usuarioRotas, { prefix: "/user" });
  app.register(manutencaoRotas, { prefix: "/manutencao" });
};

app.register(routes, { prefix: "/api" });

app.setErrorHandler(errorMiddleware);

export default app;

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

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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

const routes = () => {
  app.register(autenticacaoRotas, { prefix: "/auth" });
};

app.register(routes, { prefix: "/api" });

app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

export default app;

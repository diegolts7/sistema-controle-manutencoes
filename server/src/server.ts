import { config } from "dotenv";
import app from "./routes/route";
import { conectarPrisma, prisma } from "./services/prisma/prisma";

config();

conectarPrisma(prisma).then(() => {
  app.listen({
    port: Number(process.env.PORT!),
    host: "0.0.0.0",
  });
  console.log("server rodando");
});

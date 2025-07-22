import { config } from "dotenv";
import { conectarPrisma } from "./config/db/conectarPrismaAoBanco";
import app from "./routes/route";

config();

conectarPrisma().then(() => {
  app.listen({
    port: Number(process.env.PORT) || 5000,
    host: "0.0.0.0",
  });
  console.log("server rodando");
});

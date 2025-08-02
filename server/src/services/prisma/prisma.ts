import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function conectarPrisma(prismaClient: PrismaClient) {
  try {
    await prismaClient.$connect();
    console.log("Prisma conectado ao banco!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

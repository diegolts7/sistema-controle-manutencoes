import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function conectarPrisma() {
  try {
    await prisma.$connect();
    console.log("Prisma conectado ao banco!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
}

export { prisma, conectarPrisma };

-- CreateEnum
CREATE TYPE "CargoEnum" AS ENUM ('PROFESSOR', 'COORDENADOR', 'TECNICO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "cargo" "CargoEnum" NOT NULL DEFAULT 'PROFESSOR',
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "id_externo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_id_externo_key" ON "usuarios"("id_externo");

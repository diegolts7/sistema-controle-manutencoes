/*
  Warnings:

  - Added the required column `cod_laboratorio` to the `manutencoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_instituicao` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "manutencoes" ADD COLUMN     "cod_laboratorio" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "cod_instituicao" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "intituicoes_ensino" (
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "cnpj" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "intituicoes_ensino_pkey" PRIMARY KEY ("codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "intituicoes_ensino_cnpj_key" ON "intituicoes_ensino"("cnpj");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_cod_instituicao_fkey" FOREIGN KEY ("cod_instituicao") REFERENCES "intituicoes_ensino"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manutencoes" ADD CONSTRAINT "manutencoes_cod_laboratorio_fkey" FOREIGN KEY ("cod_laboratorio") REFERENCES "laboratorios"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

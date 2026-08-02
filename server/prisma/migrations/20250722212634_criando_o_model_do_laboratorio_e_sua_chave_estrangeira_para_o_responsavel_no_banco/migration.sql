-- CreateTable
CREATE TABLE "laboratorios" (
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" TEXT,
    "responsavel_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laboratorios_pkey" PRIMARY KEY ("codigo")
);

-- AddForeignKey
ALTER TABLE "laboratorios" ADD CONSTRAINT "laboratorios_responsavel_id_fkey" FOREIGN KEY ("responsavel_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

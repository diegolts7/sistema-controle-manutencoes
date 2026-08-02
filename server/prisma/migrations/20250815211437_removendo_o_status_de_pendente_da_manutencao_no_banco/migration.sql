/*
  Warnings:

  - The values [PENDENTE] on the enum `StatusManutencao` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusManutencao_new" AS ENUM ('SOLICITADA', 'CANCELADA', 'CONCLUIDA');
ALTER TABLE "manutencoes" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "manutencoes" ALTER COLUMN "status" TYPE "StatusManutencao_new" USING ("status"::text::"StatusManutencao_new");
ALTER TYPE "StatusManutencao" RENAME TO "StatusManutencao_old";
ALTER TYPE "StatusManutencao_new" RENAME TO "StatusManutencao";
DROP TYPE "StatusManutencao_old";
ALTER TABLE "manutencoes" ALTER COLUMN "status" SET DEFAULT 'SOLICITADA';
COMMIT;

-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "message" TEXT DEFAULT 'No message',
ALTER COLUMN "action" DROP DEFAULT;

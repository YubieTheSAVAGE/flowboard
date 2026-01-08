import 'server-only';
import { AuditAction, PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter });

export const createAuditLog = async (userId: string, action: AuditAction, message?: string) => {
    const auditLog = await prisma.auditLog.create({
        data: {
            userId,
            action,
            message,
        }
    })
    return auditLog;
}

export const getAuditLogs = async () => {
    const auditLogs = await prisma.auditLog.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return auditLogs;
}

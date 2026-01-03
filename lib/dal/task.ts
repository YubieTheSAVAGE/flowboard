import 'server-only';
import { PrismaClient, TaskStatus } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config'
import { cache } from 'react';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter });

export const createTask = async (name: string, description: string, projectId: string, assigneeId: string) => {
    const task = await prisma.task.create({
        data: {
            name,
            description,
            projectId,
            assigneeId,
        }
    })
    return task;
}

export const getTasks = async () => {
    const tasks = await prisma.task.findMany({
        include: {
            project: true,
            assignee: true,
        }
    });
    return tasks;
}

export const getTasksCache = cache(async () => {
    const tasks = await getTasks();
    return tasks;
})

export const updateTask = async (id: string, data: { name?: string, description?: string, status?: TaskStatus }) => {
    const task = await prisma.task.update({
        where: { id },
        data,
    });
    return task;
}

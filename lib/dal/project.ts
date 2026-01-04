import 'server-only';
import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config'
import { cache } from 'react';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter });


export const createProject = async (name: string, description: string, ownerId: string) => {
    const project = await prisma.project.create({
        data: {
            name,
            description,
            ownerId,
        }
    })
    return project;
}

export const getProjects = async () => {
    const projects = await prisma.project.findMany({
        include: {
            tasks: true,
        }
    })
    return projects;
} 

export const getProjectsCache = cache(async () => {
    const projects = await getProjects();
    return projects;
})

export const updateProject = async (id: string, name: string, description: string) => {
    const project = await prisma.project.update({
        where: { id },
        data: { name, description, updatedAt: new Date() },
    })
    return project;
}
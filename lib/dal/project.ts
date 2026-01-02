import 'server-only';
import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config'

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
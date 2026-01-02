"use server"
import { createProject as createProjectDal, getProjects as getProjectsDal } from "@/lib/dal/project";
import { verifySession } from "../dal/dal";

export async function createProject(formData: FormData) {
    const session = await verifySession();
    if (!session?.userId) {
        throw new Error("Unauthorized");
    }
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name || !description) {
        throw new Error("Name and description are required");
    }
    
    const project = await createProjectDal(name, description, session.userId as string);
    if (!project) {
        return {
            error: "Failed to create project",
        };
    }
    return {
        success: "Project created successfully",
    };
}

export async function getProjects() {
    const session = await verifySession();
    if (!session?.userId) {
        throw new Error("Unauthorized");
    }
    const projects = await getProjectsDal();
    if (!projects) {
        throw new Error("Failed to get projects");
    }
    return {
        projects,
    };
}
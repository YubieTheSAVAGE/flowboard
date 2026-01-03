"use server"
import { createProject as createProjectDal, getProjects as getProjectsDal, getProjectsCache as getProjectsCacheDal } from "@/lib/dal/project";
import { verifySession } from "../dal/dal";
import { CreateProjectFormState } from "@/lib/definitions";
import { cache } from "react";

export async function createProject(
    prevState: CreateProjectFormState | undefined,
    formData: FormData
){
    const session = await verifySession();
    if (!session?.userId) {
        return {
            errors: {
                name: ["Unauthorized"],
            },
        };
    }
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const errors: { name?: string[]; description?: string[] } = {};
    if (!name) {
        errors.name = ["Name is required"];
    }
    if (!description) {
        errors.description = ["Description is required"];
    }
    if (Object.keys(errors).length > 0) {
        return { errors };
    }
    
    const project = await createProjectDal(name, description, session.userId as string);
    if (!project) {
        return {
            errors: {
                name: ["Failed to create project"],
            },
        };
    }
    return {
        message: "Project created successfully",
    };
}

export async function getProjects() {
    const session = await verifySession();
    if (!session?.userId) {
        return {
            errors: {
                projects: ["Unauthorized"],
            },
        };
    }
    const projects = await getProjectsDal();
    if (!projects) {
        return {
            errors: {
                projects: ["Failed to get projects"],
            },
        };
    }
    return {
        projects,
    };
}

export async function getProjectsCache() {
    const projects = await getProjectsCacheDal();
    if (!projects) {
        throw new Error("Failed to get projects cache");
    }
    return {    
        projects,
    };
}
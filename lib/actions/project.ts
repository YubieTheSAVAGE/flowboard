"use server"
import { createProject as createProjectDal, getProjects as getProjectsDal, getProjectsCache as getProjectsCacheDal } from "@/lib/dal/project";
import { verifySession } from "../dal/dal";
import { CreateProjectFormState, projectSchema } from "@/lib/definitions";
import { revalidatePath } from "next/cache";

export async function createProject(
    prevState: CreateProjectFormState | undefined,
    formData: FormData
){
    const session = await verifySession();
    if (!session?.userId) {
        return {
            message: "Unauthorized",
        };
    }
    
    const validatedFields = projectSchema.safeParse({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
    });
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }
    const { name, description } = validatedFields.data;

    const project = await createProjectDal(name, description, session.userId as string);
    if (!project) {
        return {
            message: "Failed to create project",
        };
    } 
    revalidatePath("/dashboard/projects");
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
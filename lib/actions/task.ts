"use server"
import { createTask as createTaskDal, getTasks as getTasksDal, updateTask as updateTaskDal } from "@/lib/dal/task";
import { verifySession } from "../dal/dal";
import { TaskStatus } from "@/generated/prisma/client";
import { CreateTaskFormState } from "../definitions";
import { getTasksCache as getTasksCacheDal } from "@/lib/dal/task";
import { taskSchema } from "../definitions";
import { revalidatePath } from "next/cache";

export async function createTask(
    prevState: CreateTaskFormState | undefined,
    formData: FormData
) {
    const session = await verifySession();
    if (!session?.userId) {
        throw new Error("Unauthorized");
    }
    
    const validatedFields = taskSchema.safeParse({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        projectId: formData.get("projectId") as string,
        status: formData.get("status") as TaskStatus,
    });
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }
    const { name, description, projectId, status } = validatedFields.data;
    const task = await createTaskDal(name, description, projectId, session.userId as string);
    if (!task) {
        return {
            message: "Failed to create task",
        };
    }
    revalidatePath("/dashboard/tasks");
}

export async function getTasks() {
    const session = await verifySession();
    if (!session?.userId) {
        throw new Error("Unauthorized");
    }
    const tasks = await getTasksDal();
    if (!tasks) {
        throw new Error("Failed to get tasks");
    }
    return {
        tasks,
    };
}

export async function getTasksCache() {
    const tasks = await getTasksCacheDal();
    return tasks;
}   

export async function updateTask(formData: FormData) {
    const session = await verifySession();
    if (!session?.userId) {
        throw new Error("Unauthorized");
    }
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as TaskStatus;
    if (!id || !name || !description || !status) {
        return {
            errors: {
                id: ["Id is required"],
                name: ["Name is required"],
                description: ["Description is required"],
                status: ["Status is required"],
            },
        };
    }
    const task = await updateTaskDal(id, { name, description, status });
    if (!task) {
        return {
            errors: {
                id: ["Failed to update task"],
            },
        };
    }
    return {
        success: "Task updated successfully",
    };
}
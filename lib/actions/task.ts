import { createTask as createTaskDal, getTasks as getTasksDal, updateTask as updateTaskDal } from "@/lib/dal/task";
import { verifySession } from "../dal/dal";
import { TaskStatus } from "@/generated/prisma/client";

export async function createTask(formData: FormData) {
    const session = await verifySession();
    if (!session?.userId) {
        throw new Error("Unauthorized");
    }
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const projectId = formData.get("projectId") as string;
    if (!name || !description || !projectId) {
        return {
            errors: {
                name: ["Name is required"],
                description: ["Description is required"],
                projectId: ["Project ID is required"],
            },
        };
    }
    const task = await createTaskDal(name, description, projectId, session.userId as string);
    if (!task) {
        return {
            errors: {
                name: ["Failed to create task"],
            },
        };
    }
    return {
        success: "Task created successfully",
    };
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
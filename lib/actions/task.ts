import { createTask as createTaskDal, getTasks as getTasksDal } from "@/lib/dal/task";
import { verifySession } from "../dal/dal";

export async function createTask(formData: FormData) {
    const session = await verifySession();
    if (!session?.userId) {
        throw new Error("Unauthorized");
    }
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const projectId = formData.get("projectId") as string;
    if (!name || !description || !projectId) {
        throw new Error("Name, description and projectId are required");
    }
    const task = await createTaskDal(name, description, projectId, session.userId as string);
    if (!task) {
        throw new Error("Failed to create task");
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
"use server"
import 
{ 
    createTask as createTaskDal, 
    getTasks as getTasksDal, 
    updateTask as updateTaskDal, 
    deleteTask as deleteTaskDal,
    getTasksCache as getTasksCacheDal 
} from "@/lib/dal/task";
import { verifySession } from "../dal/dal";
import { TaskStatus } from "@/generated/prisma/client";
import { CreateTaskFormState, UpdateTaskFormState, updateTaskSchema } from "../definitions";
import { taskSchema } from "../definitions";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

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
    return {
        success: true,
        message: "Task created successfully",
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

export async function getTasksCache() {
    const tasks = await getTasksCacheDal();
    return tasks;
}   

export async function updateTask(
    id: string,
    prevState: UpdateTaskFormState | undefined,
    formData: FormData
) {
    const session = await verifySession();
    if (!session?.userId) {
        return {
            message: "Unauthorized",
        };
    }
    
    const validatedFields = updateTaskSchema.safeParse({
        id,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
    });
    
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }
    
    const { name, description } = validatedFields.data;
    const status = formData.get("status") as TaskStatus;
    
    const task = await updateTaskDal(id, { name, description, status });
    if (!task) {
        return {
            message: "Failed to update task",
        };
    }
    revalidatePath("/dashboard/tasks");
    return {
        success: true,
        message: "Task updated successfully",
    };
}

export async function deleteTask(id: string) {
    const session = await verifySession();
    if (!session?.userId) {
        return {
            message: "Unauthorized",
        };
    }
    const task = await deleteTaskDal(id);
    if (!task) {
        return {
            message: "Failed to delete task",
        };
    }
    revalidatePath("/dashboard/tasks");
    return {
        success: true,
        message: "Task deleted successfully",
    };
}
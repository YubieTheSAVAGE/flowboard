import { CreateTaskDialog } from "@/components/ui/dialogs/create-task-dialog"
import { Metadata } from "next";
import TasksData from "@/components/ui/tasks-data";
import { getUser } from "@/lib/dal/dal";
import { canCreateTask } from "@/lib/permissions";

export const metadata: Metadata = {
    title: "Tasks",
    description: "Flowboard is a platform for creating and managing your tasks.",
};

export default async function TasksPage() {
    const user = await getUser();

    return (
        <>
            <div className="flex justify-end">
                {
                    canCreateTask() && (
                        <CreateTaskDialog trigger="Create Task" title="Create Task" description="Create a new task to manage your project." />
                    )
                }
            </div>
            <TasksData />
        </>
    )
}
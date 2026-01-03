import { CreateTaskDialog } from "@/components/ui/dialogs/create-task-dialog"
import { Metadata } from "next";
import TasksData from "@/components/ui/tasks-data";

export const metadata: Metadata = {
    title: "Tasks",
    description: "Flowboard is a platform for creating and managing your tasks.",
};

export default function TasksPage() {
    return (
        <>
            <div className="flex justify-end">
                <CreateTaskDialog trigger="Create Task" title="Create Task" description="Create a new task to manage your project." />
            </div>
            <TasksData />
        </>
    )
}
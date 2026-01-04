import { Card } from "./card";
import { Suspense } from "react";
import { Skeleton } from "./skeleton";
import { getTasks } from "@/lib/actions/task";
import { getStatusLabel } from "@/lib/utils";
import { PencilIcon, TrashIcon } from "lucide-react";
import { EditTaskDialog } from "./dialogs/edit-task-dialog";
import { DeleteTaskDialog } from "./dialogs/delete-task-dialog";

async function TasksList() {
    const result = await getTasks();

    if (!result.tasks) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-red-600 italic">No tasks found</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.tasks.map((task) => (
                <Card key={task.id} className="group flex flex-col p-4 hover:shadow-xl transition-shadow duration-300 min-h-[140px]">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold">{task.name}</h3>
                        <div className="relative flex items-center gap-2">
                            <p className="text-sm text-gray-500 hidden md:block md:opacity-100 md:group-hover:opacity-0 transition-opacity duration-300">{task.project.name}</p>
                            <div className="flex items-center gap-2 opacity-100 md:absolute md:right-0 md:opacity-0 md:group-hover:opacity-100 md:pointer-events-none md:group-hover:pointer-events-auto transition-opacity duration-300">
                                <EditTaskDialog
                                    trigger={
                                        <PencilIcon className="w-4 h-4 cursor-pointer" />
                                    }
                                    title="Edit Task"
                                    description="Edit the task details"
                                    task={task}
                                />
                                <DeleteTaskDialog
                                    trigger={
                                        <TrashIcon className="w-4 h-4 cursor-pointer text-destructive hover:text-destructive/80" />
                                    }
                                    taskId={task.id}
                                    taskName={task.name}
                                />
                            </div>
                        </div>
                    </div>
                    {!task.description.length ?
                        <p className="text-sm text-gray-500 italic">No description</p>
                        :
                        <p className="text-sm text-gray-500">{task.description}</p>
                    }
                    <div className="mt-auto flex justify-between items-end">
                        <p className="text-sm text-gray-500">{task.assignee.name}</p>
                        <p className="text-sm text-gray-500">{getStatusLabel(task.status)}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
}

function TasksLoading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </Card>
            ))}
        </div>
    );
}

export default function TasksData() {
    return (
        <Suspense fallback={<TasksLoading />}>
            <TasksList />
        </Suspense>
    );
}
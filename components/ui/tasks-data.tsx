import { Card } from "./card";
import { Suspense } from "react";
import { Skeleton } from "./skeleton";
import { getTasks } from "@/lib/actions/task";

async function TasksList() {
    const result = await getTasks();
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.tasks.map((task) => (
                <Card key={task.id} className="p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold">{task.name}</h3>
                        <p className="text-sm text-gray-500">{task.project.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">{task.assignee.name}</p>
                        <p className="text-sm text-gray-500">{task.status}</p>
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
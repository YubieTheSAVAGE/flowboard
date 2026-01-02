import { getProjects } from "@/lib/actions/project";
import { Card } from "./card";
import { Suspense } from "react";
import { Skeleton } from "./skeleton";

async function ProjectsList() {
    const result = await getProjects();
    
    if (result.errors) {
        return <p className="text-red-500">{result.errors.projects[0]}</p>;
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.projects.map((project) => (
                <Card key={project.id} className="p-4">
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.description}</p>
                </Card>
            ))}
        </div>
    );
}

function ProjectsLoading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </Card>
            ))}
        </div>
    );
}

export default function ProjectsData() {
    return (
        <Suspense fallback={<ProjectsLoading />}>
            <ProjectsList />
        </Suspense>
    );
}
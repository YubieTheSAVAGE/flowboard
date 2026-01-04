import { getProjects } from "@/lib/actions/project";
import { Card } from "./card";
import { Suspense } from "react";
import { Skeleton } from "./skeleton";
import { Button } from "./button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { EditProjectDialog } from "./dialogs/edit-project-dialog";
import { Project, Role } from "@/generated/prisma/client";
import { DeleteProjectDialog } from "./dialogs/delete-project-dialog";
import { getUser } from "@/lib/dal/dal";
import { canDeleteProject, canUpdateProject } from "@/lib/permissions";

async function ProjectsList() {
    const result = await getProjects();
    const user = await getUser();
    
    if (result.errors) {
        return <p className="text-red-500">{result.errors.projects[0]}</p>;
    }

    if (!result.projects) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-red-600 italic">No projects found</p>
            </div>
        )
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.projects.map((project) => (
                <Card key={project.id} className="group p-4 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold">{project.name}</h3>
                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                            {
                                canUpdateProject(user?.role as Role, project.ownerId, user?.id as string) && (
                                    <EditProjectDialog
                                        trigger={
                                            <PencilIcon className="w-4 h-4 cursor-pointer" />
                                        }
                                        title="Edit Project"
                                        description="Edit the project details"
                                        project={project as Project}
                                    />
                                )
                            }
                            {
                                canDeleteProject(user?.role as Role, project.ownerId, user?.id as string) && (
                                    <DeleteProjectDialog
                                        trigger={
                                            <TrashIcon className="w-4 h-4 cursor-pointer text-destructive hover:text-destructive/80" />
                                        }
                                        projectId={project.id}
                                        projectName={project.name}
                                    />
                                )
                            }
                        </div>
                    </div>
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
import { Metadata } from "next";
import { CreateProjectDialog } from "@/components/ui/dialogs/create-project-dialog";
import ProjectsData from "@/components/ui/data/projects-data";
import { getUser } from "@/lib/dal/dal";
import { canCreateProject } from "@/lib/permissions";
import { Role } from "@/generated/prisma/client";

export const metadata: Metadata = {
    title: "Projects",
    description: "Flowboard is a platform for creating and managing your flowcharts.",
};

export default async function Projects() {
    const user = await getUser()
    return (
        <>
            <div className="flex justify-end">
                <CreateProjectDialog 
                    trigger="Create Project" 
                    title="Create Project" 
                    description="Create a new project to manage your tasks." 
                    canCreateProject={canCreateProject(user?.role as Role)} 
                />
            </div>
            <ProjectsData />
        </>
    )
}
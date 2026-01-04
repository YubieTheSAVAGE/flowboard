import { Metadata } from "next";
import { CreateProjectDialog } from "@/components/ui/dialogs/create-project-dialog";
import ProjectsData from "@/components/ui/projects-data";
import { getUser } from "@/lib/dal/dal";
import { canCreateProject } from "@/lib/permissions";
import { Role } from "@/generated/prisma/client";

export const metadata: Metadata = {
    title: "Projects",
    description: "Flowboard is a platform for creating and managing your flowcharts.",
};

export default async function Projects() {
    const user = await getUser();


    return (
        <>
            <div className="flex justify-end">
                {
                    canCreateProject(user?.role as Role) && (
                        <CreateProjectDialog trigger="Create Project" title="Create Project" description="Create a new project to manage your tasks." />
                    )
                }
            </div>
            <ProjectsData />
        </>
    )
}
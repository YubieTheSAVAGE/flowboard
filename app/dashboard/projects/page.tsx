import { Metadata } from "next";
import { CreateProjectDialog } from "@/components/ui/dialogs/create-project-dialog";
import ProjectsData from "@/components/ui/projects-data";

export const metadata: Metadata = {
    title: "Projects",
    description: "Flowboard is a platform for creating and managing your flowcharts.",
};

export default function Projects() {
    return (
        <>
            <div className="flex justify-end">
                <CreateProjectDialog trigger="Create Project" title="Create Project" description="Create a new project to manage your tasks." />
            </div>
            <ProjectsData />
        </>
    )
}
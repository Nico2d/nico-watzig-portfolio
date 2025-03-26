import { getProjects } from "@/lib/notion/getProjects";
import { INotionProject } from "@/types/notion.types";
import { Metadata } from "next";
import { ProjectsTemplate } from "@/components/templates/ProjectsTemplete";

export const metadata: Metadata = {
    title: "Projects | Nico Wätzig",
    description:
        "Welcome to my website, where you may discover information about me, the technologies and projects on which I work.",
};

const ProjectsPage = async () => {
    const projects: INotionProject[] = await getProjects();

    return <ProjectsTemplate projects={projects} />;
};

export default ProjectsPage;

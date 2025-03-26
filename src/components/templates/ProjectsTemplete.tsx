"use client";

import { INotionProject } from "@/types/notion.types";
import { useState } from "react";
import { Filter } from "../molecules/Filter";
import { ProjectsGrid } from "../molecules/ProjectsGrid";

interface IProjectsTemplate {
    projects: INotionProject[];
}
export const ProjectsTemplate = ({ projects }: IProjectsTemplate) => {
    const [filteredPosts, setFilteredPosts] = useState<INotionProject[]>(projects);

    const filterProjects = (filter) => {
        if (filter === "all") {
            setFilteredPosts(projects);
        } else {
            setFilteredPosts(
                projects.filter((item: INotionProject) => {
                    const technologies = item.Technology?.split(",") ?? [];

                    return technologies
                        .map((item) => item.toLowerCase())
                        .includes(filter.toLowerCase());
                })
            );
        }
    };

    return (
        <div className="container mx-auto px-4 space-y-8 mt-24 lg:mt-48 mb-20">
            <Filter onClick={filterProjects} />

            {filteredPosts.length > 0 ? (
                <ProjectsGrid posts={filteredPosts} />
            ) : (
                <p>There are no posts yet</p>
            )}
        </div>
    );
};

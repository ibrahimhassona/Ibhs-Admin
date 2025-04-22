import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useLocale } from "next-intl";
import LoaderOne from "../ui/LoaderOne";
import { Project } from "@/lib/types";
import { useAppSelector } from "@/lib/hooks";

const ProjectsList = ({ projects }: { projects: Project[] | null }) => {
  const locale = useLocale();

  const liveNewProjects = useAppSelector((state) => state.projects.projects);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);

  //-- Here We Merged the local projects with the live projects to show them in the UI ---
  useEffect(() => {
    const allProjects = [...(projects || []), ...(liveNewProjects || [])];

    const uniqueProjects = Array.from(
      new Map(allProjects.map((p) => [p.id, p])).values()
    );

    setDisplayedProjects(uniqueProjects);
  }, [projects, liveNewProjects]);

  return (
    <>
      {displayedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full mt-10 h-[300px]">
          <LoaderOne />
        </div>
      )}
    </>
  );
};

export default ProjectsList;

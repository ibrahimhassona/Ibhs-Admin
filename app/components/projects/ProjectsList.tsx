import React, { useMemo } from "react";
import ProjectCard from "./ProjectCard";
import { useLocale } from "next-intl";
import LoaderOne from "../ui/LoaderOne";
import { Project } from "@/lib/types";
const ProjectsList = ({ projects }: { projects: Project[] | null }) => {
  //  ---- Memoize projects ----
  const displayedProjects = useMemo(() => projects ?? [], [projects]);
  // --- Locale ---
  const locale = useLocale();
  return (
    <>
      {displayedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
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

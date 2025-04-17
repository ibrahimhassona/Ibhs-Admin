import React, { useMemo } from "react";
import { Project } from "./ProjectsSection";
import ProjectCard from "./ProjectCard";
import { useLocale } from "next-intl";
const ProjectsList = ({ projects }: { projects: Project[] | null }) => {
  //  ---- Memoize projects ----
  const displayedProjects = useMemo(() => projects ?? [], [projects]);
  // --- Locale ---
  const locale = useLocale()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {displayedProjects.length > 0 ? (
        displayedProjects.map((project) => (
         <ProjectCard key={project.id} project={project} locale={locale}/>
        ))
      ) : (
        <p className="text-gray-400">لا توجد مشاريع مضافة بعد.</p>
      )}
    </div>
  );
};

export default ProjectsList;

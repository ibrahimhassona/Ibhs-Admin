import React, { useMemo } from "react";
import { Project } from "./ProjectsSection";
import ProjectCard from "./ProjectCard";
const ProjectsList = ({ projects }: { projects: Project[] }) => {
  const displayedProjects = useMemo(() => projects, [projects]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {displayedProjects.length > 0 ? (
        displayedProjects.map((project) => (
         <ProjectCard key={project.id} project={project} />
        ))
      ) : (
        <p className="text-gray-400">لا توجد مشاريع مضافة بعد.</p>
      )}
    </div>
  );
};

export default ProjectsList;

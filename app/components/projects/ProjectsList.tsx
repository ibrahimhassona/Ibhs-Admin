import React from "react";
import ProjectCard from "./ProjectCard";
import { useLocale } from "next-intl";
import LoaderOne from "../ui/LoaderOne";
import { Project } from "@/lib/types";
import { useAppSelector } from "@/lib/hooks";

const ProjectsList = ({ projects , isloading}: { projects: Project[] | null,isloading:boolean }) => {
  const locale = useLocale();
  const deletedProject = useAppSelector((state) => state.projects.deletedProject);
  
  return (
    <>
      {!isloading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {projects?.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              style={`${deletedProject?.id === project?.id ? "destroy" : ""}`}
            />
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

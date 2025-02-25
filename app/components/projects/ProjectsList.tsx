import React, { useMemo } from "react";
import BottomOfCard from "./BottomOfCard";
import { Project } from "./ProjectsSection";
import Image from "next/image";
const ProjectsList = ({ projects }: { projects: Project[] }) => {
  const displayedProjects = useMemo(() => projects, [projects]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {displayedProjects.length > 0 ? (
        displayedProjects.map((project) => (
          <div
            key={project.id}
            className=" p-4 rounded-lg shadow-lg flex flex-col gap-2 justify-between"
          >
            <Image
              src={project.image}
              alt={project.title}
              priority
              height={300}
              width={300}
              className="w-full h-40 object-cover rounded-md "
            />
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className=" text-sm">{project.status}</p>
            <p className=" text-xs ">{project.publishDate}</p>
            <p className=" text-sm ">{project.description}</p>

            <div className="flex flex-wrap gap-2 ">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            <BottomOfCard project={project} />
          </div>
        ))
      ) : (
        <p className="text-gray-400">لا توجد مشاريع مضافة بعد.</p>
      )}
    </div>
  );
};

export default ProjectsList;

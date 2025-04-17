import React from "react";
import { Project } from "./ProjectsSection";
import Image from "next/image";
import BottomOfCard from "./BottomOfCard";
import { TbLabelImportantFilled } from "react-icons/tb";
// import { useTranslations } from "next-intl";
import { RiTeamFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";

const ProjectCard = ({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) => {
  // const t = useTranslations("projects")
  const [projectFreedom, setProjectFreedom] = React.useState<Project>(project);
  const catchFromBottomOfCard = (updatedProject: Project) => {
    console.log("Real time updated :====>", updatedProject);
    // ---- Live update If Server Update Done ----
    setProjectFreedom(updatedProject);
  };
  return (
    <div
      key={projectFreedom.id}
      className=" p-4 rounded-lg shadow-lg flex flex-col  justify-between  border borderColor relative"
    >
      <Image
        src={projectFreedom.image}
        alt={projectFreedom.title}
        priority
        height={300}
        width={300}
        className="w-full h-40 object-cover rounded-md "
      />
      {/* ------- developeres ------- */}
      <p
        className={`text-sm text-primary border-[1px] custom-border text-nowrap absolute top-1 start-1 bg-background-light dark:bg-background-dark p-1 rounded-md`}
      >
        {projectFreedom.status == "Full" ? (
          <FaUserAlt size={14} />
        ) : (
          <RiTeamFill size={16} />
        )}
      </p>
      {/* ------- Title  ------- */}
      <h3 className="text-lg font-semibold my-2">{projectFreedom.title}</h3>

      <p className=" text-xs">{projectFreedom.date}</p>
      <p className=" text-sm my-1 ">
        {projectFreedom.description.slice(0, 90) + " ..."}
      </p>
      <div className="flex flex-wrap gap-1 my-1 ">
        {(
          (Array.isArray(projectFreedom.technologies)
            ? projectFreedom.technologies
            : (projectFreedom.technologies as string).split(",")) as string[]
        ).map((tech: string, index: number) => (
          <span
            key={index}
            className="bg-primary-dark text-white text-xs px-2 py-[3px] rounded-sm flex items-center justify-between gap-1"
          >
            <TbLabelImportantFilled
              size={14}
              className={`${locale == "ar" ? "rotate-180" : ""}`}
            />
            {tech.trim()}
          </span>
        ))}
      </div>
      {/* --- need to pass the 2 function delete , update here --- */}
      <BottomOfCard project={projectFreedom} onUpdate={catchFromBottomOfCard} />
    </div>
  );
};

export default ProjectCard;

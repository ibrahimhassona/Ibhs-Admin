import React, { useEffect, useState } from "react";
import Image from "next/image";
import BottomOfCard from "./BottomOfCard";
import { TbLabelImportantFilled } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { Project } from "@/lib/types";
import { useAppSelector } from "@/lib/hooks";

const ProjectCard = ({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) => {
  // استخدم متغير حالة واحد فقط لتخزين بيانات المشروع
  const [displayedProject, setDisplayedProject] = useState<Project>(project);
  
  // استمع للتغييرات في المشروع الحالي من Redux
  const currentProjectFromRedux = useAppSelector((state) => state.projects.currentProject);
  
  useEffect(() => {
    // تحقق إذا كان المشروع الذي يتم تحريره هو نفس المشروع في هذه البطاقة
    if (currentProjectFromRedux && currentProjectFromRedux.id === project.id) {
      // تحديث البيانات المعروضة بالبيانات الجديدة من Redux
      setDisplayedProject(currentProjectFromRedux);
    }
  }, [currentProjectFromRedux, project.id]);
  
  return (
    <div
      key={displayedProject.id}
      className="p-4 rounded-lg shadow-lg flex flex-col justify-between border borderColor relative"
    >
      <Image
        src={displayedProject.image}
        alt={displayedProject.title}
        priority
        height={300}
        width={300}
        className="w-full h-40 object-cover rounded-md"
      />
      {/* ------- developeres ------- */}
      <p
        className={`text-sm text-primary border-[1px] custom-border text-nowrap absolute top-1 start-1 bg-background-light dark:bg-background-dark p-1 rounded-md`}
      >
        {displayedProject.status === "Full" ? (
          <FaUserAlt size={14} />
        ) : (
          <RiTeamFill size={16} />
        )}
      </p>
      {/* ------- Title  ------- */}
      <h3 className="text-lg font-semibold my-2">{displayedProject.title}</h3>

      <p className="text-xs">{displayedProject.date}</p>
      <p className="text-sm my-1">
        {displayedProject.description.slice(0, 90) + " ..."}
      </p>
      <div className="flex flex-wrap gap-1 my-1">
        {(
          (Array.isArray(displayedProject.technologies)
            ? displayedProject.technologies
            : (displayedProject.technologies as string).split(",")) as string[]
        ).map((tech: string, index: number) => (
          <span
            key={index}
            className="bg-primary-dark text-white text-xs px-2 py-[3px] rounded-sm flex items-center justify-between gap-1"
          >
            <TbLabelImportantFilled
              size={14}
              className={`${locale === "ar" ? "rotate-180" : ""}`}
            />
            {tech.trim()}
          </span>
        ))}
      </div>
      {/* --- Need to pass the 2 function delete , update here --- */}
      <BottomOfCard
        project={displayedProject}
        // onUpdate={catchFromBottomOfCard}
      />
    </div>
  );
};

export default ProjectCard;
"use client";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import ProjectsList from "./ProjectsList";
import { getProjects } from "@/lib/getData";
import { useLocale, useTranslations } from "next-intl";
import AddAndEditDialog from "../AddAndEditDialog";

export interface Project {
  id?: string;
  image: string;
  title: string;
  slug: string;
  status: string;
  technologies:string[];
  description: string;
  date: string;
  isFeature: string;
  video: string;
  links: {
    live: string;
    repo: string;
  };
}

export default function ProjectsComponent() {
  // State to manage the addition of a new project
  const [isAdding, setIsAdding] = useState(false);
  // -------- Projects --------
  const [projects, setProjects] = useState<Project[] | null>([]);
  // ----- New Project -----

  // ------- Locale -------
  const locale = useLocale();
  const t = useTranslations("projects");
  // ------- Fetch Projects -------
  useEffect(() => {
    const featchData = async () => {
      const { projects, error } = await getProjects(locale);
      if (error) {
        console.error(error.message);
        setProjects(null);
      } else {
        setProjects(projects);
      }
    };
    featchData();
  }, [locale]);

  const handleAddProject = (newProject: Project) => {
    console.log("New Project:====>", newProject);
    // -- Create a new project and post it to Backend --
  };
  return (
    <section className="">
      <AddAndEditDialog
        isOpen={isAdding}
        setIsOpen={setIsAdding}
        isEditMode={false}
        onSubmit={handleAddProject}
      >
        {t("addNewProject")}
        <MdAdd size={20} />
      </AddAndEditDialog>
      {/* ---- List Of Projects ---- */}
      <ProjectsList projects={projects} />
    </section>
  );
}

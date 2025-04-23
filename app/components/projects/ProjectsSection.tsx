"use client";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import ProjectsList from "./ProjectsList";
import { getProjects } from "@/lib/getData";
import { useLocale, useTranslations } from "next-intl";
import AddAndEditDialog from "../AddAndEditDialog";
import { Project } from "@/lib/types";

export default function ProjectsComponent() {
  // State to manage the addition of a new project
  const [isAdding, setIsAdding] = useState(false);
  // -------- Projects --------
  const [projects, setProjects] = useState<Project[] | null>([]);
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
  // ------- Add New Project -------
  return (
    <section className="">
      <AddAndEditDialog
        isOpen={isAdding}
        setIsOpen={setIsAdding}
        isEditMode={false}
        style="px-4 py-2"
        // onSubmit={handleAddProject}
      >
        {t("addNewProject")}
        <MdAdd size={20} />
      </AddAndEditDialog>
      {/* ---- List Of Projects ---- */}
      <ProjectsList projects={projects} />
    </section>
  );
}

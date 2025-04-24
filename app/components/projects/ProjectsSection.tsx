"use client";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import ProjectsList from "./ProjectsList";
import { useLocale, useTranslations } from "next-intl";
import AddAndEditDialog from "../AddAndEditDialog";
import { Project } from "@/lib/types";
import { useProjects } from "@/app/hooks/useProjects";

export default function ProjectsComponent() {
  // State to manage the addition of a new project
  const [isAdding, setIsAdding] = useState(false);
  // ------- Locale -------
  const locale = useLocale();
  const t = useTranslations("projects");
  // ------- Fetch Projects -------
  const { projects, isLoading } = useProjects(locale);
  // ------- Add New Project -------
  return (
    <section className="">
      <AddAndEditDialog
        isOpen={isAdding}
        setIsOpen={setIsAdding}
        isEditMode={false}
        style="px-4 py-2"
      >
        {t("addNewProject")}
        <MdAdd size={20} />
      </AddAndEditDialog>
      {/* ---- List Of Projects ---- */}
      <ProjectsList
        projects={projects?.projects as Project[]}
        isloading={isLoading}
      />
    </section>
  );
}

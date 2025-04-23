import ProjectsSection from "@/app/components/projects/ProjectsSection";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations("Sidebar");

  return (
    <>
      <h2 className="pageTitle">{t("projects")}</h2> 
        <section className="pageContainer">
        <ProjectsSection />
      </section>
    </>
  );
}

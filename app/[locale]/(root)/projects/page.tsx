import ProjectsSection from "@/app/components/projects/ProjectsSection";
import React from "react";

const page = () => {
  return (
    <>
      <h2 className="pageTitle">المشاريع</h2>
      <section className="pageContainer">
        <ProjectsSection />
      </section>
    </>
  );
};

export default page;

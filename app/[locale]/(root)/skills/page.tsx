import SkillsMainComponent from "@/app/components/skills/SkillsMainComponent";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations("Skills");

  return (
    <div>
      <h1 className="pageTitle">{t("Skills")}</h1>
      <SkillsMainComponent />
    </div>
  );
};

export default Page;

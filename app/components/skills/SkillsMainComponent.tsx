"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Technologies from "./Technologies";
import Personalskills from "./Personalskills";

export default function SkillsMainComponent() {
  const t = useTranslations("Skills");
  const [activeTab, setActiveTab] = useState<"technologies" | "personalskills">(
    "technologies"
  );

  return (
    <section className="pageContainer">
      {/* ✅ الجزء العلوي كما هو */}
      <div className="flex gap-4 max-sm:gap-2 border-b max-md:justify-around borderColor mb-6">
        <button
          aria-label="technologies"
          name="technologies"
          onClick={() => setActiveTab("technologies")}
          className={`pb-3 px-4 max-md:pb-2 max-md:px-2 max-md:text-xs relative cust-trans flex items-center gap-2 ${
            activeTab === "technologies" ? "text-primary-dark" : ""
          }`}
        >
          <span className="">{t("technologies")}</span>
          {activeTab === "technologies" && (
            <div className="absolute bottom-0 cust-trans start-0 w-full h-[3px] bg-primary-dark rounded-t-full" />
          )}
        </button>
        <button
          aria-label="personalskills"
          name="personalskills"
          onClick={() => setActiveTab("personalskills")}
          className={`pb-3 px-4 max-md:pb-2 max-md:px-2 max-md:text-xs relative cust-trans flex items-center gap-2 ${
            activeTab === "personalskills" ? "text-primary-dark " : ""
          }`}
        >
          <span className="">{t("personalskills")}</span>
          {activeTab === "personalskills" && (
            <div className="absolute bottom-0 cust-trans start-0 w-full h-[3px] bg-primary-dark rounded-t-full" />
          )}
        </button>
      </div>

      {/* ✅ عرض المحتوى حسب التاب المحدد */}
      <div>
        {activeTab === "technologies" && <Technologies />}
        {activeTab === "personalskills" && <Personalskills />}
      </div>
    </section>
  );
}

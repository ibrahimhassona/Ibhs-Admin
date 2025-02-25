"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Technologies from "./Technologies";
import Personalskills from "./Personalskills";

export default function SkillsMainComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("Skills");

  // Read the tab from the query, default to "technologies"
  const tabFromQuery =
    (searchParams.get("tab") as "technologies" | "personalskills") ||
    "technologies";

  const [activeTab, setActiveTab] = useState<"technologies" | "personalskills">(
    tabFromQuery
  );

  // Update state when the query changes
  useEffect(() => {
    setActiveTab(tabFromQuery);
  }, [tabFromQuery]);

  const handleTabChange = (tab: "technologies" | "personalskills") => {
    router.push(`?tab=${tab}`, { scroll: false });
    setActiveTab(tab);
  };

  return (
    <section className="pageContainer">
      {/* ✅ Tab buttons */}
      <div className="flex gap-4 max-sm:gap-2 border-b max-md:justify-around borderColor mb-6">
        <button
          aria-label="technologies"
          name="technologies"
          onClick={() => handleTabChange("technologies")}
          className={`pb-3 px-4 max-md:pb-2 max-md:px-2 max-md:text-xs relative cust-trans flex items-center gap-2 ${
            activeTab === "technologies" ? "text-primary-dark" : ""
          }`}
        >
          <span>{t("technologies")}</span>
          {activeTab === "technologies" && (
            <div className="absolute bottom-0 cust-trans start-0 w-full h-[3px] bg-primary-dark rounded-t-full" />
          )}
        </button>

        <button
          aria-label="personalskills"
          name="personalskills"
          onClick={() => handleTabChange("personalskills")}
          className={`pb-3 px-4 max-md:pb-2 max-md:px-2 max-md:text-xs relative cust-trans flex items-center gap-2 ${
            activeTab === "personalskills" ? "text-primary-dark " : ""
          }`}
        >
          <span>{t("personalskills")}</span>
          {activeTab === "personalskills" && (
            <div className="absolute bottom-0 cust-trans start-0 w-full h-[3px] bg-primary-dark rounded-t-full" />
          )}
        </button>
      </div>

      {/* ✅ Render tab content */}
      <div>
        {activeTab === "technologies" && <Technologies />}
        {activeTab === "personalskills" && <Personalskills />}
      </div>
    </section>
  );
}

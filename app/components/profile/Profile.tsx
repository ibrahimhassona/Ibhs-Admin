"use client";

import { useState } from "react";
import AboutMe from "./AboutMe";
import CoverAndImage from "./CoverAndImage";
import PersonalInfo from "./PersonalInfo";
import WorkPrinciples from "./WorkPrinciples";
import { PROFILE_SUB_ROUTES } from "@/lib/route";
import { useTranslations } from "next-intl";
import { FaUser, FaImage, FaIdCard, FaLightbulb } from "react-icons/fa";

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState<string>(
    PROFILE_SUB_ROUTES.CoverAndImage
  );
  const t = useTranslations("Profile");
  const tabIcons  = {
    CoverAndImage: <FaImage className="w-5 h-5 sm:hidden" />, 
    PersonalInfo: <FaIdCard className="w-5 h-5 sm:hidden" />, 
    AboutMe: <FaUser className="w-5 h-5 sm:hidden" />, 
    WorkPrinciples: <FaLightbulb className="w-5 h-5 sm:hidden" />, 
  };

  return (
    <section className="pageContainer">
      <div className="flex gap-4 max-sm:gap-2 border-b max-md:justify-around borderColor mb-6">
        {Object.entries(PROFILE_SUB_ROUTES).map(([key, route]) => (
          <button
            key={route}
            onClick={() => setActiveTab(route)}
            className={`pb-3 px-4 max-md:pb-2 max-md:px-2 max-md:text-xs relative cust-trans flex items-center gap-2 ${
              activeTab === route ? "text-primary-dark font-semibold" : ""
            }`}
          >
            {tabIcons[key]} 
            <span className="max-sm:hidden">{t(route)}</span>
            {activeTab === route && (
              <div className="absolute bottom-0 cust-trans left-2 w-[calc(100%-20px)] h-[3px] bg-primary-dark rounded-t-full" />
            )}
          </button>
        ))}
      </div>
      <div>
        {activeTab === PROFILE_SUB_ROUTES.CoverAndImage && <CoverAndImage />}
        {activeTab === PROFILE_SUB_ROUTES.PersonalInfo && <PersonalInfo />}
        {activeTab === PROFILE_SUB_ROUTES.AboutMe && <AboutMe />}
        {activeTab === PROFILE_SUB_ROUTES.WorkPrinciples && <WorkPrinciples />}
      </div>
    </section>
  );
}

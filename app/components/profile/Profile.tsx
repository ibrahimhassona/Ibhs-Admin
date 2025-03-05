"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AboutMe from "./AboutMe";
import CoverAndImage from "./CoverAndImage";
import PersonalInfo from "./PersonalInfo";
import WorkPrinciples from "./WorkPrinciples";
import { PROFILE_SUB_ROUTES } from "@/lib/route";
import { useLocale, useTranslations } from "next-intl";
import { FaUser, FaImage, FaIdCard, FaLightbulb } from "react-icons/fa";
import { getPersonalInformation } from "@/lib/getData";

export default function AdminProfile() {
  const locale = useLocale();
  const [persoData, setPersoData] = useState<any>(null); // Initialize with null

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      const { Personal_information, error } = await getPersonalInformation(locale);
  
      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
  
      console.log("Personal Information:", Personal_information);
      setPersoData(Personal_information[0]); // Store the fetched data
    };
  
    fetchPersonalInfo(); // Call the async function
  }, [locale]); // Runs when locale changes
  
  

  const searchParams = useSearchParams();
  const router = useRouter();
  const tabFromQuery =
    searchParams.get("tab") || PROFILE_SUB_ROUTES.CoverAndImage;
  const [activeTab, setActiveTab] = useState<string>(tabFromQuery);
  const t = useTranslations("Profile");

  const tabIcons = {
    CoverAndImage: <FaImage className="w-5 h-5 sm:hidden" />,
    PersonalInfo: <FaIdCard className="w-5 h-5 sm:hidden" />,
    AboutMe: <FaUser className="w-5 h-5 sm:hidden" />,
    WorkPrinciples: <FaLightbulb className="w-5 h-5 sm:hidden" />,
  };

  useEffect(() => {
    setActiveTab(tabFromQuery);
  }, [tabFromQuery]);

  const handleTabChange = (route: string) => {
    router.push(`?tab=${route}`, { scroll: false });
    setActiveTab(route);
  };

  return (
    <section className="pageContainer">
      <div className="flex gap-4 max-sm:gap-2 border-b max-md:justify-around borderColor mb-6">
        {Object.entries(PROFILE_SUB_ROUTES).map(([key, route]) => (
          <button
            aria-label="route"
            name="route"
            key={route}
            onClick={() => handleTabChange(route)}
            className={`pb-3 px-4 max-md:pb-2 max-md:px-2 max-md:text-xs relative cust-trans flex items-center gap-2 ${
              activeTab === route ? "text-primary-dark " : ""
            }`}
          >
            {tabIcons[key]}
            <span className="max-sm:hidden">{t(route)}</span>
            {activeTab === route && (
              <div className="absolute bottom-0 cust-trans start-0 w-full h-[3px] bg-primary-dark rounded-t-full" />
            )}
          </button>
        ))}
      </div>
      <div>
        {activeTab === PROFILE_SUB_ROUTES.CoverAndImage && <CoverAndImage locale={locale} data={{image:persoData?.image,cover:persoData?.cover}}/>}
        {activeTab === PROFILE_SUB_ROUTES.PersonalInfo && <PersonalInfo  locale={locale} data={persoData}/>}
        {activeTab === PROFILE_SUB_ROUTES.AboutMe && <AboutMe />}
        {activeTab === PROFILE_SUB_ROUTES.WorkPrinciples && <WorkPrinciples />}
      </div>
    </section>
  );
}

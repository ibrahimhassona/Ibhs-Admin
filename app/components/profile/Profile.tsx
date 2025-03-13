"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AboutMe from "./AboutMe";
import CoverAndImage from "./CoverAndImage";
import WorkPrinciples from "./WorkPrinciples";
import { PROFILE_SUB_ROUTES } from "@/lib/route";
import { useLocale, useTranslations } from "next-intl";
import { FaUser, FaImage, FaIdCard, FaLightbulb } from "react-icons/fa";
import { getPersonalInformation } from "@/lib/getData";
import PersonalInfo from "./PersonalInfo";

// Define UserProfile type
interface SocialLink {
  url: string;
  platform: string;
}
export interface UserProfile {
  id: string;
  language: string;
  name: string;
  job_title: string;
  addresses: string[];
  current_company: string;
  previous_companies: string | null;
  email: string;
  phone_numbers: string[];
  social_links: SocialLink[];
  about_me: string;
  work_principles: string[];
  cv_link: string;
  cover: string;
  image: string;
}

export default function AdminProfile() {
  const locale = useLocale();
  const [persoData, setPersoData] = useState<UserProfile | null>(null); // Use UserProfile | null

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      const { Personal_information, error } = await getPersonalInformation(
        locale
      );

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      if (
        Array.isArray(Personal_information) &&
        Personal_information.length > 0
      ) {
        setPersoData(Personal_information[0]); // Store the first object
      } else {
        setPersoData(null); // Set to null if no data
      }
    };

    fetchPersonalInfo();
  }, [locale]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const tabFromQuery =
    searchParams.get("tab") || PROFILE_SUB_ROUTES.CoverAndImage;
  const [activeTab, setActiveTab] = useState<string>(tabFromQuery);
  const t = useTranslations("Profile");

  const tabIcons: Record<string, React.ReactNode> = {
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
        {activeTab === PROFILE_SUB_ROUTES.CoverAndImage && (
          <CoverAndImage
            locale={locale}
            data={{
              image: persoData?.image ?? "",
              cover: persoData?.cover ?? "",
            }}
          />
        )}
        {activeTab === PROFILE_SUB_ROUTES.PersonalInfo && persoData && (
          <PersonalInfo data={persoData} />
        )}
        {activeTab === PROFILE_SUB_ROUTES.AboutMe && persoData && (
          <AboutMe data={persoData} />
        )}
        {activeTab === PROFILE_SUB_ROUTES.WorkPrinciples && <WorkPrinciples />}
      </div>
    </section>
  );
}

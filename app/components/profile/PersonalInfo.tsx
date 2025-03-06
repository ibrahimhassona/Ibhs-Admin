
import { FaUser, FaPhone, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdWork } from "react-icons/md";
import SocialLinksEditor from "./SocialLinks";
import { useTranslations } from "next-intl";
import { LuLink, LuList } from "react-icons/lu";
import Item from "./Item";
import { JSX, useState } from "react";
import LoaderOne from "../ui/LoaderOne";
import { UserProfile } from "./Profile";


export type IconKeys = "name" | "job_title" | "email" | "phone_numbers" | "current_company" | "addresses";


const PersonalInfo = ({ data }: { data: UserProfile }) => {
  const t = useTranslations("Profile");
  const [editingItem, setEditingItem] = useState<string | null>(null);
console.log('======>',data)
  if (!data) {
    return <LoaderOne/>; 
  }


// Use ReactNode instead of JSX.Element for better compatibility
const icons: Record<IconKeys, JSX.Element> = {
  name: <FaUser className="me-2 text-primary-dark" size={20} />,
  job_title: <MdWork className="me-2 text-primary-dark" size={20} />,
  email: <MdEmail className="me-2 text-primary-dark" size={20} />,
  phone_numbers: <FaPhone className="me-2 text-primary-dark" size={20} />,
  current_company: <FaBuilding className="me-2 text-primary-dark" size={20} />,
  addresses: <FaMapMarkerAlt className="me-2 text-primary-dark" size={20} />,
};

  const baseItems = {
    name: data?.name || "",  
    job_title: data?.job_title || "",
    email: data?.email || "",
    phone_numbers: data?.phone_numbers || [],
    current_company: data?.current_company || "",
    addresses: data?.addresses || [],
  };

  return (
    <div className="animate-fadeIn cust-trans flex flex-col gap-6">
      {/* -------- Personal Items ------- */}
      <div>
        <h2 className="py-2 font-bold flex items-center gap-2">
          {t("personal_items")} <LuList />
        </h2>
        <div className="gap-4 grid lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1">
          {Object.entries(baseItems).map(([key, value]) => (
            <Item
              key={key}
              title={t(key)}
              value={value}
              icon={icons[key as IconKeys]}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              itemKey={key}
            />
          ))}
        </div>
      </div>
      {/* ------ Social Media --------*/}
      <div>
        <h2 className=" py-2 font-bold flex items-center gap-2">
          {t("social_links")} <LuLink />
        </h2>
        <SocialLinksEditor />
      </div>
    </div>
  );
};

export default PersonalInfo;

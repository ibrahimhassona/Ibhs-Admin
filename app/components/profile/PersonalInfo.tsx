import React, { ReactElement, useState } from "react";
import { FaUser, FaPhone, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdWork } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiContractFill } from "react-icons/ri";
import SocialLinksEditor from "./SocialLinks";
import { useTranslations } from "next-intl";
import { LuLink, LuList } from "react-icons/lu";
import Item from "./Item";
const PersonalInfo = () => {
  const t = useTranslations("Profile");

  return (
    <div className="animate-fadeIn cust-trans  flex flex-col gap-6">
      {/* -------- Personal Items ------- */}
      <div>
        <h2 className="py-2 font-bold flex items-center gap-2">{t("personal_items")} <LuList/></h2>
        <div className="gap-4 grid lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1">
          <Item
            title={t("name")}
            value="ابراهيم حسونه الهاشمى"
            icon={<FaUser className="me-2 text-primary-dark" size={20} />}
          />
          <Item
            title={t("job_title")}
            value="مطور مواقع إلكترونية ( Fron-End)"
            icon={<MdWork className="me-2 text-primary-dark" size={20} />}
          />
          <Item
            title={t("email")}
            value="ibrahim.m.hassouna@gmail.com"
            icon={<MdEmail className="me-2 text-primary-dark" size={20} />}
          />
          <Item
            title={t("phone_number")}
            value="01001705917"
            icon={<FaPhone className="me-2 text-primary-dark" size={20} />}
          />
          <Item
            title={t("current_company")}
            value="مجموعة منزل التسويق"
            icon={<FaBuilding className="me-2 text-primary-dark" size={20} />}
          />
          <Item
            title={t("addresses")}
            value={["كفر الشيخ", "القاهره"]}
            icon={
              <FaMapMarkerAlt className="me-2 text-primary-dark" size={20} />
            }
          />
        </div>
      </div>
      {/* ------ Social Media --------*/}
      <div>
        <h2 className=" py-2 font-bold flex items-center gap-2">{t("social_links")} <LuLink/></h2>
        <SocialLinksEditor />
      </div>
    </div>
  );
};

export default PersonalInfo;



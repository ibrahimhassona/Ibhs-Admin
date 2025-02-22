import { useTranslations } from "next-intl";
import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const CoverAndImage = () => {
  const t = useTranslations("Profile");
  return (
    <div className="flex items-center gap-6 max-md:flex-col">
      {/* ------ Image -------- */}
      <ImageComponent title={t("changePersonalPhoto")} />
      {/* ------ cover -------- */}
      <ImageComponent title={t("changePersonalCover")} />
    </div>
  );
};

export default CoverAndImage;

const ImageComponent: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="mx-2">{title}</h2>
      <div className=" shadow-md bg-gray-200 rounded-md h-60 w-[400px] max-md:w-[250px] max-md:h-40  relative overflow-hidden">
        {/* ---- Layout ---- */}
        <div className="w-full h-full flex items-center justify-center bg-black/20">
          <MdOutlineAddPhotoAlternate size={40} className=" cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

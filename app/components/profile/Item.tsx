import { useTranslations } from "next-intl";
import React, { ReactElement, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiContractFill } from "react-icons/ri";

const Item: React.FC<{ title: string; value: string | string[]; icon?: ReactElement }> = ({ title, value, icon }) => {
  const [editing, setEditing] = useState<string>("");
  const t = useTranslations("Profile");

  const toggleEditing = (newValue: string) => {
    setEditing(newValue);
  };

  return (
    <div className="flex justify-between border min-h-[71px] border-primary-dark/30 border-dashed p-4 rounded-md overflow-hidden relative">
      {editing === String(value) ? (
        <div className="flex gap-2 absolute top-0 start-0 w-full bg-red-200 h-full items-center justify-between p-4 animate-fade-up cust-trans">
          <div className="flex items-center gap-2">
            <button onClick={() => toggleEditing("h")} className="doneBtn" aria-label="save">
              {t("save")}
            </button>
            <button onClick={() => toggleEditing("")} className="cancelBtn" aria-label="cancel">
              {t("cancel")}
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ---- Label ----- */}
          <div className="h-full flex flex-col justify-between">
            <h2 className="flex items-center text-sm">
              {icon ? icon : <RiContractFill className="me-2 text-primary-dark" size={20} />}
              {title}
            </h2>
            {/* --- Value ---- */}
            {Array.isArray(value) ? (
              value.map((item, index) => (
                <p key={index} className="text-sm rounded-sm select-none ps-6 max-sm:ps-0">
                  {item}
                </p>
              ))
            ) : (
              <p className="text-sm rounded-sm select-none ps-6 max-sm:ps-0">{value}</p>
            )}
          </div>
          <button
            aria-label={t("edit_social_link")}
            className="p-2 rounded-md h-fit dark:hover:bg-primary/20 hover:bg-gray-200 group cust-trans"
            onClick={() => toggleEditing(String(value))}
          >
            <CiEdit size={22} className="cursor-pointer cust-trans text-yellow-600 dark:group-hover:text-yellow-400 group-hover:text-gray-900" />
          </button>
        </>
      )}
    </div>
  );
};

export default Item;

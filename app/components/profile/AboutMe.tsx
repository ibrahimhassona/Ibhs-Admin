import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { CiEdit } from "react-icons/ci";
import { MdCancelPresentation } from "react-icons/md";
import { useTranslations } from "next-intl";

const AboutMe = () => {
  const [aboutMe, setAboutMe] = useState(
    "أنا مطور مواقع إلكترونية (Front-End) متخصص في بناء واجهات احترافية وتجربة مستخدم سلسة."
  );
  const [isEditing, setIsEditing] = useState(false);
const t =useTranslations("Profile")
  const handleSave = () => {
    setIsEditing(false);
  };
  return (
    <div className="  rounded-md flex flex-col gap-4 ">
      <div className="flex justify-between items-center mb-4">
        
        <button
        name={isEditing ? "إلغاء" : "تعديل"}
        className={`mt-2 py-2 px-4 cust-trans w-fit rounded-md  text-white ${isEditing ? 'bg-primary-dark hover:bg-primary' :'bg-yellow-600 hover:bg-yellow-500'} text-sm flex items-center gap-2 overflow-hidden`}
         aria-label= {isEditing ? "إلغاء" : "تعديل"}
          onClick={() => setIsEditing(!isEditing)}
        >
          { isEditing ?  <MdCancelPresentation className="cust-trans animate-fade-up" size={18} />:<CiEdit className="cust-trans animate-fade-up"  size={18}/>}

          {isEditing ? <p className="cust-trans animate-fade-up">{t("cancel")}</p> :<span className="cust-trans animate-fade-up">{t("edit")}</span>}
        </button>
      </div>

      {isEditing ? (
        <div className=" flex flex-col gap-2 items-end">
          <Textarea
            className="w-full p-2 cust-trans animate-fade-up"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            rows={4}
          />
          <button name="save" aria-label="save" className="mt-2 py-2 text-white px-4 cust-trans w-fit rounded-md bg-primary-dark text-sm hover:bg-primary" onClick={handleSave}>
          {t("save")}
          </button>
        </div>
      ) : (
        <p className="text-sm">{aboutMe}</p>
      )}
    </div>
  );
}

export default AboutMe
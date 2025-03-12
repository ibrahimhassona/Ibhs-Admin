import { JSX, useState, useCallback } from "react";
import {
  FaLinkedin,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { ImSpinner10 } from "react-icons/im";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import supabase from "@/lib/supabase";

// ✅ تحويل أول حرف إلى كبير (لضمان توافق الأسماء)
const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// ✅ تعريف الأيقونات
const socialIcons: Record<string, JSX.Element> = {
  LinkedIn: <FaLinkedin className="text-primary-dark" size={20} />,
  Telegram: <FaTelegram className="text-primary-dark" size={20} />,
  Tiktok: <FaTiktok className="text-primary-dark" size={20} />, // إصلاح الاسم
  Whatsapp: <FaWhatsapp className="text-primary-dark" size={20} />,
  Github: <FaGithub className="text-primary-dark" size={20} />,
  Youtube: <FaYoutube className="text-primary-dark" size={20} />, // إصلاح الاسم
};

interface SocialLinksEditorProps {
  socialLinks: { url: string; platform: string }[];
  userId: number;
}

const SocialLinksEditor = ({ socialLinks }: SocialLinksEditorProps) => {
  const t = useTranslations("Profile");
  const [links, setLinks] = useState(socialLinks);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedUrl, setEditedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ بدء التعديل
  const handleEdit = useCallback((index: number, currentUrl: string) => {
    setEditIndex(index);
    setEditedUrl(currentUrl);
  }, []);

  // ✅ حفظ التعديلات
  const handleSave = useCallback(async (index: number) => {
    setLoading(true);
    const updatedLinks = [...links];
    updatedLinks[index].url = editedUrl;
    setLinks(updatedLinks);

    const { error } = await supabase
      .from("Personal_information")
      .update({ social_links: updatedLinks })
      .in("language", ["ar", "en"]);

    if (error) {
      console.error("❌ Error updating social links:", error);
      toast.error(t("update_failed") + " ❌", { description: error.message });
    } else {
      toast.success(`${t("update_success")} ✅`);
      setEditIndex(null);
    }
    setLoading(false);
  }, [editedUrl, links, t]);

  return (
    <div>
      <ul className="gap-4 grid lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1">
        {links.map(({ platform, url }, index) => {
          const normalizedPlatform = capitalizeFirstLetter(platform);
          return (
            <li
              key={index}
              className="flex items-center justify-between min-h-[71px] p-4 bg-card border-[1px] borderColor rounded-md relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                {socialIcons[normalizedPlatform] || <FaLinkedin size={20} className="text-primary-dark"/>} 
                <span className="font-medium">{normalizedPlatform}</span>
              </div>

              <div className="flex items-center gap-2">
                {editIndex === index ? (
                  <div className="flex gap-2 absolute top-0 start-0 w-full h-full items-center justify-between p-4 animate-fade-up cust-trans">
                    <Input
                      value={editedUrl}
                      onChange={(e) => setEditedUrl(e.target.value)}
                      className="w-[100px] bg-white text-gray-900 border border-gray-300 dark:bg-background-dark dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light rounded-md px-2 py-1 transition-all flex-1"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSave(index)}
                        className="doneBtn disabled:opacity-50"
                        aria-label={t("save")}
                        name={t("save")}
                        disabled={loading}
                      >
                        {loading ? <ImSpinner10 size={18} className="animate-spin" /> : t("save")}
                      </button>
                      <button
                        onClick={() => !loading && setEditIndex(null)}
                        className="cancelBtn disabled:opacity-50"
                        aria-label={t("cancel")}
                        name={t("cancel")}
                        disabled={loading}
                      >
                        {t("cancel")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    aria-label="تغيير او تعديل عنصر اساسي"
                    name="تغيير او تعديل عنصر اساسي"
                    className="p-2 rounded-md h-fit dark:hover:bg-primary/20 hover:bg-gray-200 group cust-trans"
                    onClick={() => handleEdit(index, url)}
                  >
                    <CiEdit
                      size={22}
                      className="cursor-pointer cust-trans text-yellow-600 dark:group-hover:text-yellow-400 group-hover:text-gray-900"
                    />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SocialLinksEditor;

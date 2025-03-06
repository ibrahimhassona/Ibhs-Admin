import { JSX, useState } from "react";
import {
  FaLinkedin,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
const socialIcons: Record<string, JSX.Element> = {
  LinkedIn: <FaLinkedin className="text-primary-dark" size={20} />,
  Telegram: <FaTelegram className="text-primary-dark" size={20} />,
  TikTok: <FaTiktok className="text-primary-dark" size={20} />,
  WhatsApp: <FaWhatsapp className="text-primary-dark" size={20} />,
  GitHub: <FaGithub className="text-primary-dark" size={20} />,
  YouTube: <FaYoutube className="text-primary-dark" size={20} />,
};

const SocialLinksEditor = () => {
  const t =useTranslations("Profile")
  const [links, setLinks] = useState([
    {
      url: "https://www.linkedin.com/in/ibrahim-hassouna-332448285",
      platform: "LinkedIn",
    },
    { url: "https://t.me/Ibrahimhassouna", platform: "Telegram" },
    { url: "https://www.tiktok.com/@ibrahim.hassouna_dev", platform: "TikTok" },
    { url: "https://wa.me/201001705917", platform: "WhatsApp" },
    { url: "https://github.com/ibrahimhassouna", platform: "GitHub" },
    { url: "https://youtube.com/@ibrahim_hassouna_web", platform: "YouTube" },
  ]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedUrl, setEditedUrl] = useState("");

  const handleEdit = (index: number, currentUrl: string) => {
    setEditIndex(index);
    setEditedUrl(currentUrl);
  };

  const handleSave = (index: number) => {
    const updatedLinks = [...links];
    updatedLinks[index].url = editedUrl;
    setLinks(updatedLinks);
    setEditIndex(null);
  };

  return (
    <div className="">
      <ul className="gap-4 grid lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1">
        {links.map((link, index) => (
          <li
            key={index}
            className="flex items-center justify-between min-h-[71px] p-4 bg-card border-[1px] borderColor rounded-md relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              {socialIcons[link.platform]}
              <span className="font-medium">{link.platform}</span>
            </div>

            <div className="flex items-center gap-2">
              {editIndex === index ? (
                <div className="flex gap-2 absolute top-0 start-0 w-full bg-red-200 h-full items-center justify-between p-4 animate-fade-up cust-trans">
                  <Input
                    value={editedUrl}
                    onChange={(e) => setEditedUrl(e.target.value)}
                    className="w-[100px] bg-white text-gray-900 border border-gray-300 
                   dark:bg-background-dark dark:text-white dark:border-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light
                    rounded-md px-2 py-1 transition-all flex-1"
                  />
                 <div className="flex items-center gap-2">
                 <button
                    onClick={() => handleSave(index)}
                    className="doneBtn"
                    aria-label={t("save")}
                    name={t("save")}
                    >
                    {t("save")}
                  </button>
                  <button
                    onClick={() => handleSave(index)}
                    className="cancelBtn"
                    aria-label={t("cancel")}
                    name={t("cancel")}
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
                  onClick={() => handleEdit(index, link.url)}
                >
                  <CiEdit
                    size={22} // تكبير الأيقونة
                    className="cursor-pointer cust-trans text-yellow-600 dark:group-hover:text-yellow-400 group-hover:text-gray-900 "
                  />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinksEditor;

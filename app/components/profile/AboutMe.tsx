import { useCallback, useState } from "react";
import { Textarea } from "../ui/textarea";
import { CiEdit } from "react-icons/ci";
import { MdCancelPresentation } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { Save } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { ImSpinner10 } from "react-icons/im"; 
import supabase from "@/lib/supabase";
import { toast } from "sonner"; 
import { UserProfile } from "./Profile";

const AboutMe = ({ data }: { data: UserProfile }) => {
  // States
  const [aboutMe, setAboutMe] = useState(data?.about_me || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  // Localization hooks
  const t = useTranslations("Profile");
  const locale = useLocale();

  // Function to handle save action
  // ✅ Improved update logic
  const handleSave = useCallback(async () => {
    if (!aboutMe.trim()) {
      toast.error(t("Profile.error_updating"), {
        description: t("Profile.unexpected_error"),
      });
      return;
    }

    // ✅ Prevent updating if value hasn't changed
    if (aboutMe === data?.about_me) {
      setIsEditing(false);
      return;
    }

    setLoading(true); // Start loading

    const { error } = await supabase
      .from("Personal_information")
      .update({ about_me: aboutMe })
      .eq("language", locale);

    setLoading(false); // Stop loading

    if (error) {
      toast.error(t("update_failed"), {
        description: error.message,
      });
      console.error("❌ Update failed:", error.message);
    } else {
      toast.success(t("update_success"));
      setIsEditing(false);
    }
  }, [aboutMe, data?.about_me, locale, t]);


  return (
    <div className="rounded-md flex flex-col gap-4">
      {/* Section Header */}
      <h2 className="py-2 font-bold flex items-center gap-2">
        {t("AboutMe")} <FaUser />
      </h2>

      {/* Edit Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          name={isEditing ? "إلغاء" : "تعديل"}
          className={`mt-2 py-2 px-4 cust-trans w-fit rounded-md text-white ${
            isEditing
              ? "bg-red-500 hover:bg-red-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          } text-sm flex items-center gap-2 overflow-hidden`}
          aria-label={isEditing ? "إلغاء" : "تعديل"}
          onClick={() => {
            if (isEditing) {
              setAboutMe(data?.about_me || ""); // Reset on cancel
            }
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? <MdCancelPresentation size={18} /> : <CiEdit size={18} />}
          <span>{isEditing ? t("cancel") : t("edit")}</span>
        </button>
      </div>

      {/* Edit Mode */}
      {isEditing ? (
        <div className="flex flex-col gap-2 items-end">
          <Textarea
            className="w-full p-2 cust-trans animate-fade-up leading-6"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            rows={4}
          />
          <button
            name="save"
            aria-label="save"
            className="mt-2 flex items-center gap-2 py-2 text-white px-4 cust-trans w-fit rounded-md bg-primary-dark text-sm hover:bg-primary disabled:opacity-50"
            onClick={handleSave}
            // disabled={loading || aboutMe === data?.about_me} // ✅ Disable if loading or no changes
          >
            {loading ? (
              <ImSpinner10 size={18} className="animate-spin" /> // ✅ Show spinner while saving
            ) : (
              <>
                <Save size={16} className="mr-2" />
                {t("save")}
              </>
            )}
          </button>
        </div>
      ) : (
        // View Mode
        <p className="text-sm">{aboutMe || t("no_about_me")}</p>
      )}
    </div>
  );
};

export default AboutMe;

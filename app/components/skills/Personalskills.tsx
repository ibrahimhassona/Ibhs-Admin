"use client";

import { useState, useCallback } from "react";
import { Trash, Pencil, Save } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";
import supabase from "@/lib/supabase";
import { useSoft } from "@/app/hooks/useSoft";
import { FaSpinner } from "react-icons/fa";
import { DeleteConfirmation } from "../DeleteConfirmation";
import { TbCancel } from "react-icons/tb";

interface Skill {
  title: string;
  desc: string;
}


export default function PersonalSkills() {
  const t = useTranslations("Skills");
  const locale = useLocale();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ title: "", desc: "" });
  const [editSkill, setEditSkill] = useState<Skill | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { skills: fetchedSkills, error, isLoading, refetch } = useSoft(locale);

  // Sync skills with fetched data
  if (
    fetchedSkills?.skills &&
    JSON.stringify(skills) !== JSON.stringify(fetchedSkills.skills)
  ) {
    setSkills(fetchedSkills.skills);
  }

  // Reusable function to update skills in Supabase
  const updateSkillsInSupabase = useCallback(
    async (
      updatedSkills: Skill[],
      successMessage: string,
      errorMessage: string
    ) => {
      try {
        const { error } = await supabase
          .from("skills")
          .update({ dataSoft: updatedSkills })
          .eq("language", locale);

        if (error) {
          console.error("Error updating skills:", error);
          toast.error(t(errorMessage));
          return false;
        }

        toast.success(t(successMessage));
        refetch();
        return true;
      } catch (error) {
        console.error("Error in updateSkillsInSupabase:", error);
        toast.error(t(errorMessage));
        return false;
      }
    },
    [locale, refetch, t]
  );

  // Add new skill
  const handleAddSkill = async () => {
    if (!newSkill.title || !newSkill.desc) {
      toast.error(t("completeData"));
      return;
    }

    const skillToAdd: Skill = { title: newSkill.title, desc: newSkill.desc };
    const updatedSkills = [...skills, skillToAdd];

    const success = await updateSkillsInSupabase(
      updatedSkills,
      "skillAddedSuccessfully",
      "errorAddingSkill"
    );
    if (success) {
      setNewSkill({ title: "", desc: "" });
    }
  };

  // Update skill
  const handleUpdateSkill = async (originalTitle: string) => {
    if (!editSkill || !editSkill.title || !editSkill.desc) {
      toast.error(t("incompleteSkillData"));
      return;
    }

    const updatedSkills = skills.map((s) =>
      s.title === originalTitle
        ? { title: editSkill.title, desc: editSkill.desc }
        : s
    );
    const success = await updateSkillsInSupabase(
      updatedSkills,
      "skillUpdatedSuccessfully",
      "errorUpdatingSkill"
    );
    if (success) {
      setEditSkill(null);
      setEditIndex(null);
    }
  };

  // Delete skill
  const handleDeleteSkill = async (skillTitle: string) => {
    const updatedSkills = skills.filter((s) => s.title !== skillTitle);

    await updateSkillsInSupabase(
      updatedSkills,
      "skillDeletedSuccessfully",
      "errorDeletingSkill"
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center flex items-center justify-center h-[400px]">
        <FaSpinner className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <p>{t("errorLoading")}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Add New Skill */}
      <div className="flex flex-col gap-2 pt-2 pb-6">
        <label className="block text-md font-bold">{t("addSkill")}</label>
        <div className="flex items-end gap-2 w-[60%] max-md:w-full">
          <div className=" flex flex-col w-full gap-3">
            <input
              type="text"
              placeholder={t("title")}
              value={newSkill.title}
              onChange={(e) =>
                setNewSkill({ ...newSkill, title: e.target.value })
              }
              className="p-2 border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder={t("description")}
              value={newSkill.desc}
              onChange={(e) =>
                setNewSkill({ ...newSkill, desc: e.target.value })
              }
              className="p-2 border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            aria-label={t("addBtn")}
            onClick={handleAddSkill}
            disabled={newSkill.desc.length < 5 || newSkill.title.length < 5}
            className={`${(newSkill.desc.length < 5 || newSkill.title.length < 5) ? " cursor-not-allowed opacity-50":""} bg-primary-dark cust-trans hover:bg-primary w-fit text-white py-2 px-4 rounded mx-auto flex text-sm`}
          >
            {t("addBtn")}
          </button>
        </div>
      </div>

      {/* ------- List of Skills ------- */}
      <ul className="flex flex-wrap gap-3 ">
        {skills?.map((skill: Skill, index: number) => (
          <li
            key={index}
            className={`flex items-center ${
              editIndex === index ? "" : "h-[60px]"
            } justify-between py-2 gap-2 px-4 border-[1px] borderColor text-sm rounded-md overflow-hidden w-full lg:w-[calc(94%/2)]`}
          >
            {editIndex === index ? (
              <div className="flex items-end justify-between max-md:flex-col gap-2 cust-trans animate-fade-up w-full">
                <div className="w-full flex flex-col gap-2">
                  {/* ---- 2 inputs -----  */}
                  <div className="flex flex-col gap-1">
                    <label className="block text-primary font-bold text-sm  mx-2">
                      {t("title")}
                    </label>
                    <input
                      type="text"
                      value={editSkill?.title || ""}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill!, title: e.target.value })
                      }
                      className="p-2 font-bold border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="block text-primary font-bold text-sm  mx-2">
                      {t("desc")}
                    </label>
                    <textarea
                      value={editSkill?.desc || ""}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill!, desc: e.target.value })
                      }
                      className="p-2 border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                {/* ---- 2 buttons -----  */}
                <div className=" flex items-center gap-2">
                  <button
                    aria-label={t("save")}
                    onClick={() => handleUpdateSkill(skill.title)}
                    className="p-2 max-md:m-auto  bg-primary-dark hover:bg-primary cust-trans text-white rounded-md text-sm flex items-center gap-2 w-fit"
                  >
                    <Save size={16} className="" />
                  </button>
                  <button
                    aria-label="cancle"
                    name="cancle"
                    className="p-2 text-white cust-trans bg-red-600 rounded-md hover:bg-red-500 disabled:opacity-50"
                    onClick={() => {
                      setEditIndex(null);
                    }}
                  >
                    <TbCancel size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* ------- Title And Desc ------- */}
                <p className="flex-1 line-clamp-2">
                  <span className="font-bold text-primary">{skill.title}</span>{" "}
                  - {skill.desc}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditSkill(skill);
                      setEditIndex(index);
                    }}
                    aria-label="edit"
                    className="p-2 text-white cust-trans bg-yellow-600 rounded-md hover:bg-yellow-500"
                  >
                    <Pencil size={16} className="" />
                  </button>
                  <DeleteConfirmation
                    style="p-1 text-white cust-trans bg-red-600 rounded-md hover:bg-red-500 disabled:opacity-50"
                    onConfirm={() => handleDeleteSkill(skill.title)}
                    title={skill.title}
                  >
                    <Trash size={16} className="" />
                  </DeleteConfirmation>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

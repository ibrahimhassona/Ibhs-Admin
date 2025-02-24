"use client";

import { useState } from "react";
import { Trash, Pencil, Save } from "lucide-react";
import { useTranslations } from "next-intl";

interface Skill {
  id: number;
  title: string;
  description: string;
}

export default function PersonalSkills() {
  const t = useTranslations("Skills");
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      title: "Communication",
      description: "Ability to communicate effectively",
    },
    {
      id: 2,
      title: "Problem Solving",
      description: "Critical thinking and analytical skills",
    },
    {
      id: 3,
      title: "Problem Solving",
      description: "Critical thinking and analytical skills",
    },
    {
      id: 4,
      title: "Problem Solving",
      description: "Critical thinking and analytical skills",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newSkill, setNewSkill] = useState({ title: "", description: "" });

  const handleAddSkill = () => {
    if (newSkill.title && newSkill.description) {
      setSkills([...skills, { id: Date.now(), ...newSkill }]);
      setNewSkill({ title: "", description: "" });
    }
  };

  const handleEditSkill = (id: number) => {
    setEditingId(id);
  };

  const handleSaveSkill = (id: number) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id
          ? {
              ...skill,
              title: newSkill.title || skill.title,
              description: newSkill.description || skill.description,
            }
          : skill
      )
    );
    setEditingId(null);
    setNewSkill({ title: "", description: "" });
  };

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="p-4">
      {/* ---------- Add New skill ---------- */}
      <div className="flex flex-col gap-2 pt-2 pb-6">
        <label className="block text-sm font-medium">{t("addSkill")}</label>
        <div className="flex items-center gap-2 max-md:flex-col">
          {/* --- Title ---- */}
          <input
            type="text"
            placeholder={t("title")}
            value={newSkill.title}
            onChange={(e) =>
              setNewSkill({ ...newSkill, title: e.target.value })
            }
            className="p-2 border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {/* --- Description ---- */}
          <input
            type="text"
            placeholder={t("description")}
            value={newSkill.description}
            onChange={(e) =>
              setNewSkill({ ...newSkill, description: e.target.value })
            }
            className="p-2 border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {/* --- Add Btn ---- */}
          <button
            aria-label={t("addBtn")}
            name={t("addBtn")}
            onClick={handleAddSkill}
            className="bg-primary-dark cust-trans hover:bg-primary w-fit text-white py-2 px-4 rounded  mx-auto flex text-sm"
          >
            {t("addBtn")}
          </button>
        </div>
      </div>
      {/* ---------- List of skills ---------- */}
      <ul className="flex flex-wrap  gap-3 ">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className={`flex items-center ${editingId==skill.id ? '':'lg:max-h-[41px]'} justify-between p-2 border-[1px] borderColor text-sm rounded-md  overflow-hidden w-full lg:w-[calc(94%/2)]`}
          >
            {editingId === skill.id ? (
              // ------------ Edite section ----------
              <div className="flex items-end justify-between max-md:flex-col gap-2 cust-trans animate-fade-up w-full">
                <div className="w-full flex flex-col gap-2">
                  <label className="block text-sm font-medium mx-2 ">
                    {t("title")}
                  </label>
                  <input
                    type="text"
                    defaultValue={skill.title}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, title: e.target.value })
                    }
                    className="p-2 border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="block text-sm font-medium mx-2 ">
                    {t("description")}
                  </label>
                  <input
                    type="text"
                    defaultValue={skill.description}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, description: e.target.value })
                    }
                    className="p-2 border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  aria-label={t("save")}
                  name={t("save")}
                  onClick={() => handleSaveSkill(skill.id)}
                  className="px-4 max-md:m-auto py-2 bg-primary-dark hover:bg-primary cust-trans text-white rounded-md text-sm flex items-center gap-2 w-fit"
                >
                  <Save size={16} className="mr-2" /> {t("save")}
                </button>
              </div>
            ) : (
              <>
                <p className="flex-1 ">
                 <span className="font-bold"> {skill.title}</span> - {skill.description}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditSkill(skill.id)}
                    aria-label="edit"
                    name="edit"
                    className="p-1 text-white cust-trans bg-yellow-600 rounded-sm hover:bg-yellow-500"
                  >
                    <Pencil size={16} className="mr-1" />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    aria-label="delete"
                    name="delete"
                    className="p-1 text-white cust-trans bg-red-600 rounded-sm hover:bg-red-500"
                  >
                    <Trash size={16} className="mr-1" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useState } from "react";
import { Input } from "../ui/input";
import { PencilIcon, CheckIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
const initialOpinions = [
  "Project Study",
  "Design Study",
  "Writing Tasks",
  "Implementing Design with Clean Code",
  "Interface Testing",
  "SEO Optimization",
  "Launch",
  "Maintenance",
  "Effective Communication",
];

const WorkPrinciples = () => {
  const [opinions, setOpinions] = useState(initialOpinions);
  const [newOpinion, setNewOpinion] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedOpinion, setEditedOpinion] = useState("");
  const t =useTranslations("Profile")

  const addOpinion = () => {
    if (newOpinion.trim() === "") return;
    setOpinions([...opinions, newOpinion]);
    setNewOpinion("");
  };

  const deleteOpinion = (index: number) => {
    setOpinions(opinions.filter((_, i) => i !== index));
  };


  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditedOpinion(opinions[index]);
  };


  const saveEdit = () => {
    if (editingIndex === null || editedOpinion.trim() === "") return;
    const updatedOpinions = [...opinions];
    updatedOpinions[editingIndex] = editedOpinion;
    setOpinions(updatedOpinions);
    setEditingIndex(null);
    setEditedOpinion("");
  };

  return (
    <div className="p-4 ">
      {/* إضافة رأي جديد */}
      <div className="flex gap-2 mb-4 lg:max-w-[500px]">
         <input
            type="text"
            placeholder={t("addNewOpinion")}
            value={newOpinion}
            onChange={(e) => setNewOpinion(e.target.value)}
            className="p-2 border border-primary-dark/30 border-dashed text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        <button className="py-2 text-white px-4 cust-trans w-fit rounded-md bg-primary-dark text-sm hover:bg-primary" onClick={addOpinion}>{t("addBtn")}</button>
      </div>

      {/* قائمة الآراء */}
      <ul className="grid grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-2">
        {opinions.map((opinion, index) => (
          <li
            key={index}
            className="p-2 min-h-[52px] shadow rounded flex justify-between items-center border border-primary-dark/30 border-dashed"
          >
            {editingIndex === index ? (
              <Input
                value={editedOpinion}
                onChange={(e) => setEditedOpinion(e.target.value)}
              />
            ) : (
              <span className="text-sm px-2">{opinion}</span>
            )}

            <div className="flex gap-2 mx-2 ">
              {editingIndex === index ? (
                <button
                  className="p-1 cust-trans text-white bg-primary-dark rounded-sm hover:bg-primary"
                  onClick={saveEdit}
                >
                  <CheckIcon size={16} />
                </button>
              ) : (
                <button
                  className="p-1 cust-trans text-white bg-yellow-600 rounded-sm hover:bg-yellow-500"
                  onClick={() => startEditing(index)}
                >
                  <PencilIcon size={16} />
                </button>
              )}
              <button
                className="p-1 cust-trans text-white bg-red-600 rounded-sm hover:bg-red-500"
                onClick={() => deleteOpinion(index)}
              >
                <Trash2Icon size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkPrinciples;

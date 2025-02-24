"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckIcon, PencilIcon, Trash2Icon, Upload } from "lucide-react";
import { useTranslations } from "next-intl";

interface Technology {
  id: number;
  name: string;
  image: string;
}

const initialTechnologies: Technology[] = [
  { id: 1, name: "Next.js", image: "/android-chrome-512x512.png" },
  { id: 2, name: "TypeScript", image: "/android-chrome-512x512.png" },
  { id: 3, name: "JavaScript", image: "/android-chrome-512x512.png" },
  { id: 4, name: "HTML", image: "/android-chrome-512x512.png" },
  { id: 5, name: "CSS", image: "/android-chrome-512x512.png" },
  { id: 6, name: "Bootstrap", image: "/android-chrome-512x512.png" },
  { id: 7, name: "Tailwind CSS", image: "/android-chrome-512x512.png" },
  { id: 8, name: "Supabase", image: "/android-chrome-512x512.png" },
];

const Technologies = () => {
  const t = useTranslations("Skills");
  const [technologies, setTechnologies] =
    useState<Technology[]>(initialTechnologies);
  const [newTech, setNewTech] = useState<Omit<Technology, "id">>({
    name: "",
    image: "",
  });
  const [editTech, setEditTech] = useState<Technology | null>(null);

  const handleAddTech = () => {
    if (!newTech.name || !newTech.image) return;
    const newId = technologies.length + 1;
    setTechnologies([...technologies, { id: newId, ...newTech }]);
    setNewTech({ name: "", image: "" });
  };

  const handleEditTech = (id: number) => {
    if (!editTech) return;
    setTechnologies(
      technologies.map((tech) => (tech.id === id ? editTech : tech))
    );
    setEditTech(null);
  };

  const handleDeleteTech = (id: number) => {
    setTechnologies(technologies.filter((tech) => tech.id !== id));
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    isNew: boolean = false
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (newTech.image) URL.revokeObjectURL(newTech.image);
      const imageUrl = URL.createObjectURL(file);
      if (isNew) {
        setNewTech((prev) => ({ ...prev, image: imageUrl }));
      } else if (editTech) {
        setEditTech((prev) => (prev ? { ...prev, image: imageUrl } : null));
      }
    }
  };

  return (
    <div className="container mx-auto p-2">
      <div className=" p-2 rounded-md grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6">
        {technologies.map((tech) => (
          <div
            key={tech.id}
            className="shadow-md p-4 rounded-md flex justify-between items-center gap-2 border border-primary-dark/30 border-dashed"
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                src={tech.image}
                alt={tech.name}
                width={60}
                height={60}
                className="rounded-md h-5 w-5"
              />
              {editTech?.id === tech.id ? (
                <input
                  type="text"
                  value={editTech.name}
                  onChange={(e) =>
                    setEditTech({ ...editTech, name: e.target.value })
                  }
                  className=" p-1 border border-primary-dark/30 border-dashed text-sm rounded-md text-start"
                />
              ) : (
                <p className="p-1 text-sm border border-transparent ">{tech.name}</p>
              )}
            </div>
            <div className="flex gap-2">
              {editTech?.id === tech.id ? (
                <button
                  aria-label="done"
                  name="done"
                  className="p-1 text-white cust-trans bg-primary-dark rounded-sm hover:bg-primary"
                  onClick={() => handleEditTech(tech.id)}
                >
                  <CheckIcon size={16} />
                </button>
              ) : (
                <button
                  aria-label="edit"
                  name="edit"
                  className="p-1 text-white cust-trans bg-yellow-600 rounded-sm hover:bg-yellow-500"
                  onClick={() => setEditTech(tech)}
                >
                  <PencilIcon size={16} />
                </button>
              )}
              <button
                aria-label="delete"
                name="delete"
                className="p-1 text-white cust-trans bg-red-600 rounded-sm hover:bg-red-500"
                onClick={() => handleDeleteTech(tech.id)}
              >
                <Trash2Icon size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-lg max-w-[500px] mx-auto">
        <h3 className=" mb-2">{t("addSkill")} </h3>
        <div className="flex items-center gap-2 p-2  rounded-md">
          {/* إدخال اسم التقنية */}
          <input
            type="text"
            placeholder={t("techName")}
            value={newTech.name}
            onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
            className="p-2 border border-primary-dark/30 border-dashed text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* زر تحميل الصورة */}
          <label className="cursor-pointer p-2 bg-primary-dark hover:bg-primary rounded-md transition flex items-center justify-center">
            <Upload className="w-5 h-5 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, true)}
              className="hidden"
            />
          </label>
        </div>
        {newTech.image && (
          <Image
            src={newTech.image}
            alt="Preview"
            width={60}
            height={60}
            className="rounded-md mx-auto mt-2"
          />
        )}
        <button
          aria-label={t("addBtn")}
          name={t("addBtn")}
          onClick={handleAddTech}
          className="bg-primary-dark cust-trans hover:bg-primary w-fit text-white py-2 px-4 rounded mt-2 mx-auto flex text-sm"
        >
          {t("addBtn")}
        </button>
      </div>
    </div>
  );
};

export default Technologies;

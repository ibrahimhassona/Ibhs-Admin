"use client";

import React, { useEffect, useState } from "react";
import { PencilIcon, CheckIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { UserProfile } from "./Profile";
import { toast } from "sonner";
import { DeleteConfirmation } from "../DeleteConfirmation";
import supabase from "@/lib/supabase";
import { ImSpinner10 } from "react-icons/im";

const WorkPrinciples = ({
  data,
  locale,
}: {
  data: UserProfile;
  locale: string;
}) => {
  const t = useTranslations("Profile");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedOpinion, setEditedOpinion] = useState("");
  const [newOpinion, setNewOpinion] = useState("");

  const [personalInfo, setPersonalInfo] = useState<string[]>([]);
  const [loading, setLoading] = useState({
    editing: false,
    add: false,
    delete: false,
  });
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPersonalInfo(data.work_principles || []);
  }, [data.work_principles]);

  // ------------ Add New Principle ---------
  const addNewPrinciple = async (newItem: string) => {
    if (!newItem.trim()) return toast.info(t("empty_field_error"));
    const updatedArray: string[] = [...personalInfo, newItem.trim()];
    setLoading((prev) => ({ ...prev, add: true }));

    const { error } = await supabase
      .from("Personal_information")
      .update({ work_principles: updatedArray })
      .eq("language", locale);

    if (!error) {
      setPersonalInfo(updatedArray);
      setNewOpinion("");
      toast.success(t("added"));
      setLoading((prev) => ({ ...prev, add: false }));
    } else {
      console.error("Add Error:", error.message);
      toast.error(t("error"));
    }
  };

  // ---------- Delete one ---------
  const deletePrinciple = async (itemToDelete: string) => {
    const updatedArray = personalInfo.filter((item) => item !== itemToDelete);
    setLoading((prev) => ({ ...prev, delete: true }));

    const { error } = await supabase
      .from("Personal_information")
      .update({ work_principles: updatedArray })
      .eq("language", locale);

    if (!error) {
      setPersonalInfo(updatedArray);
      toast.success(t("delete_item"));
      setLoading((prev) => ({ ...prev, delete: false }));
    } else {
      console.error("Delete Error:", error.message);
      toast.error(t("error"));
    }
  };

  // ----------- Start Editing ----------
  const startEditing = (index: number, value: string) => {
    setEditingIndex(index);
    setEditedOpinion(value);
  };

  // ----------- Save Edited Item ----------
  const saveEditedPrinciple = async (index: number, newValue: string) => {
    const updatedArray = [...personalInfo];
    updatedArray[index] = newValue.trim();
    setLoading((prev) => ({ ...prev, editing: true }));

    const { error } = await supabase
      .from("Personal_information")
      .update({ work_principles: updatedArray })
      .eq("language", locale);

    if (!error) {
      setPersonalInfo(updatedArray);
      setEditingIndex(null);
      toast.success(t("update_success"));
      setLoading((prev) => ({ ...prev, editing: false }));
    } else {
      console.error("Update Error:", error.message);
      toast.error(t("error"));
    }
  };

  return (
    <div className="p-4">
      {/*------------ Add New Principle --------------*/}
      <div className="flex gap-2 mb-4 lg:max-w-[500px]">
        <input
          type="text"
          placeholder={t("addNewOpinion")}
          value={newOpinion}
          onChange={(e) => setNewOpinion(e.target.value)}
          className="p-2 border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          aria-label={t("addBtn")}
          name={t("addBtn")}
          disabled={newOpinion.length === 0 || loading.add}
          className={`py-2 text-white px-4 cust-trans w-fit rounded-md bg-primary-dark text-sm hover:bg-primary ${
            newOpinion.length == 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => addNewPrinciple(newOpinion)}
        >
          {loading.add ? (
            <ImSpinner10 size={16} className="animate-spin" />
          ) : (
            t("addBtn")
          )}
        </button>
      </div>

      {/*------------ List of Principles --------------*/}
      <ul className="grid grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-2">
        {personalInfo.map((opinion, index) => (
          <li
            key={index}
            className="p-2 min-h-[52px] shadow rounded flex justify-between items-center border-[1px] borderColor"
          >
            {editingIndex === index ? (
              <input
                className="py-1.5 px-2 border-[1px] borderColor text-sm rounded-md text-start w-full animate-fade-up cust-trans"
                value={editedOpinion}
                onChange={(e) => setEditedOpinion(e.target.value)}
              />
            ) : (
              <span className="py-1 px-2 border-[1px] border-transparent text-sm rounded-md text-start w-full animate-fade-down cust-trans">
                {opinion}
              </span>
            )}

            <div className="flex gap-2 mx-2">
              {editingIndex === index ? (
                <button
                  name={t("save")}
                  aria-label={t("save")}
                  className="cust-trans bg-primary-dark hover:bg-primary p-2 rounded-md text-white"
                  onClick={() => saveEditedPrinciple(index, editedOpinion)}
                >
                  {loading.editing ? (
                    <ImSpinner10 size={16} className="animate-spin" />
                  ) : (
                    <CheckIcon size={16} />
                  )}
                </button>
              ) : (
                <button
                  name={t("edit")}
                  aria-label={t("edit")}
                  className="cust-trans bg-yellow-600 hover:bg-yellow-500 p-2 rounded-md text-white"
                  onClick={() => startEditing(index, opinion)}
                >
                  <PencilIcon size={16} />
                </button>
              )}

              <DeleteConfirmation onConfirm={() => deletePrinciple(opinion)}>
                {editingIndex === index && loading.delete ? (
                  <ImSpinner10 size={16} className="animate-spin" />
                ) : (
                  <Trash2Icon size={16} />
                )}{" "}
              </DeleteConfirmation>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkPrinciples;

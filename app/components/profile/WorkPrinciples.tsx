import React, { useState } from "react";
import { PencilIcon, CheckIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { UserProfile } from "./Profile";
import { toast } from "sonner";
import { DeleteConfirmation } from "../DeleteConfirmation";
const WorkPrinciples = ({ data }: { data: UserProfile }) => {
  console.log(data?.work_principles);
  const t = useTranslations("Profile");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedOpinion, setEditedOpinion] = useState("");

  // ----------- Start Editing ----------
  const startEditing = (index: number, value: string) => {
    setEditingIndex(index);
    setEditedOpinion(value);
  };
  // ----------- Save ----------
  const save = () => {
    setEditingIndex(null);
    toast.success(t("update_success"));
  };
  // ----------- delete ----------
  const deleteItem = (index:number) => {
    toast.success(t("delete_item"));
    console.log(index)
  };
  return (
    <div className="p-4 ">
      {/*------------ Add New Principle --------------*/}
      <div className="flex gap-2 mb-4 lg:max-w-[500px]">
        <input
          type="text"
          placeholder={t("addNewOpinion")}
          // value={newOpinion}
          // onChange={(e) => setNewOpinion(e.target.value)}
          className="p-2 border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          aria-label={t("addBtn")}
          name={t("addBtn")}
          className="py-2 text-white px-4 cust-trans w-fit rounded-md bg-primary-dark text-sm hover:bg-primary"
          // onClick={addOpinion}
        >
          {t("addBtn")}
        </button>
      </div>

      {/* قائمة الآراء */}
      <ul className="grid grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-2">
        {data?.work_principles?.map((opinion, index) => (
          <li
            key={index}
            className="p-2 min-h-[52px] shadow rounded flex justify-between items-center border-[1px] borderColor"
          >
            {editingIndex === index ? (
              <input
                className="py-1 px-2 border-[1px] borderColor text-sm rounded-md text-start w-full animate-fade-up cust-trans"
                value={editedOpinion}
                onChange={(e) => setEditedOpinion(e.target.value)}
              />
            ) : (
              <span className="py-1 px-2 border-[1px] border-transparent text-sm rounded-md text-start w-full animate-fade-down cust-trans">
                {opinion}
              </span>
            )}

            <div className="flex gap-2 mx-2 ">
              {editingIndex === index ? (
                <button
                  name={t("save")}
                  aria-label={t("save")}
                  className="p-1 cust-trans text-white bg-primary-dark rounded-sm hover:bg-primary"
                  onClick={save}
                >
                  <CheckIcon size={16} />
                </button>
              ) : (
                <button
                  name={t("edit")}
                  aria-label={t("edit")}
                  className="p-1 cust-trans text-white bg-yellow-600 rounded-sm hover:bg-yellow-500"
                  onClick={() => startEditing(index, opinion)}
                >
                  <PencilIcon size={16} />
                </button>
              )}
              {/* <button
                name="delete"
                aria-label="delete"
                className="p-1 cust-trans text-white bg-red-600 rounded-sm hover:bg-red-500"
                onClick={() => deleteItem()}
              >
                <Trash2Icon size={16} />
              </button> */}
              <DeleteConfirmation
                // style={"p-1 cust-trans text-white bg-red-600 rounded-sm hover:bg-red-500"}
                onConfirm={() => deleteItem(index)}
               
              >
                <Trash2Icon size={16} />
              </DeleteConfirmation>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkPrinciples;

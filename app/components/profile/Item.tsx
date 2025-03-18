import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiContractFill } from "react-icons/ri";
import { Input } from "../ui/input";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import { ImSpinner10 } from "react-icons/im";

interface ItemProps {
  title: string;
  value: string | string[];
  icon?: React.ReactNode;
  editingItem: string | null;
  setEditingItem: (key: string | null) => void;
  itemKey: string;
  onSave?: (newValue: string | string[]) => void;
  tableName?: string;
  columnName?: string;
  rowId?: number;
  language?: string;
}

const Item: React.FC<ItemProps> = ({
  title,
  value,
  icon,
  editingItem,
  setEditingItem,
  itemKey,
  tableName,
  columnName,
  language,
}) => {
  const t = useTranslations("Profile");
  const isEditing = editingItem === itemKey;
  const [editedValue, setEditedValue] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  // ------- Supabase Update ---------
  const updateValueInSupabase = async (newValue: string | string[]) => {
    console.log("🟢 تحديث Supabase بالقيمة:", newValue);
    console.log(tableName, columnName);
    if (!tableName || !columnName) return;
    setLoading(true);
    const { error } = await supabase
      .from(tableName)
      .update({ [columnName]: newValue })
      .eq("language", language);

    setLoading(false);

    if (error) {
      toast.error(t("update_failed") + "❌", { description: error.message });
      console.error("❌ تحديث فشل: ", error.message);
      return;
    }

    toast.success(`${t("update_success")} ✅`);
    setEditingItem(null);
  };

  const handleSave = () => {
    if (editedValue === value) {
      setEditingItem(null);
      return;
    }
    updateValueInSupabase(editedValue);
  };

  return (
    <div className="flex justify-between border-[1px] borderColor p-4 rounded-md overflow-hidden relative">
      {isEditing ? (
        <div className="flex gap-2 w-full h-full items-center justify-between animate-fade-up cust-trans">
          <div className="flex flex-col gap-2 w-full">
            {Array.isArray(editedValue) ? (
              editedValue.map((item, index) => (
                <Input
                  key={index}
                  value={item}
                  onChange={(e) => {
                    const newValues = [...editedValue];
                    newValues[index] = e.target.value;
                    setEditedValue(newValues);
                  }}
                />
              ))
            ) : (
              <Input
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              />
            )}
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={handleSave}
              className="doneBtn disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading||editedValue==value}
              aria-label="save"
            >
              {loading ? (
                <ImSpinner10 size={18} className=" animate-spin" />
              ) : (
                t("save")
              )}
            </button>
            <button
              onClick={() => setEditingItem(null)}
              className="cancelBtn"
              aria-label="cancel"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="h-full flex flex-col justify-between cust-trans animate-fade-down">
            <h2 className="flex items-center text-sm">
              {icon || (
                <RiContractFill className="me-2 text-primary-dark" size={20} />
              )}
              {title}
            </h2>
            {Array.isArray(value) ? (
              value.map((item, index) => (
                <p key={index} className="text-sm select-none text-gray-400 ">
                  {item}
                </p>
              ))
            ) : (
              <p className="text-sm select-none text-gray-400">{value}</p>
            )}
          </div>
          <button
            name={`edit ${itemKey}`}
            aria-label={`edit ${itemKey}`}
            className="p-1 rounded-md bg-yellow-500 hover:bg-yellow-600 group cust-trans flex items-center justify-center h-[30px] w-[40px] animate-fade-down"
            onClick={() => setEditingItem(itemKey)}
          >
            <CiEdit size={22} className="cursor-pointer text-gray-900" />
          </button>
        </>
      )}
    </div>
  );
};

export default Item;

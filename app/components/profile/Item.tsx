// Item.tsx
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiContractFill } from "react-icons/ri";
import { Input } from "../ui/input";
import supabase from "@/lib/supabase";
import { toast } from "sonner"; // استخدام Sonner للإشعارات
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
  rowId,
  language,
}) => {
  const t = useTranslations("Profile");
  const isEditing = editingItem === itemKey;
  const [editedValue, setEditedValue] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  // ------- تحديث القيم في Supabase ---------
  const updateValueInSupabase = async (newValue: string | string[]) => {
    if (!tableName || !columnName || !rowId) return;

    setLoading(true);
    const { error } = await supabase
      .from(tableName)
      .update({ [columnName]: newValue })
      .eq("id", rowId)
      .eq("language", language); // التأكد من تحديث اللغة الصحيحة

    setLoading(false);

    if (error) {
      toast.error(t("update_failed")+"❌", { description: error.message });
      console.error("❌ تحديث فشل: ", error.message);
      return;
    }

    toast.success(`${t("update_success")} ✅`);
    setEditingItem(null);
  };

  const handleSave = () => {
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
              className="doneBtn"
              disabled={loading}
              aria-label="save"
            >
              {loading ? <ImSpinner10 size={18} className=" animate-spin" /> : t("save")}
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
              {icon || <RiContractFill className="me-2 text-primary-dark" size={20} />}
              {title}
            </h2>
            {Array.isArray(value) ? (
              value.map((item, index) => (
                <p key={index} className="text-sm select-none text-gray-400">
                  {item}
                </p>
              ))
            ) : (
              <p className="text-sm select-none text-gray-400">{value}</p>
            )}
          </div>
          <button
            className="p-2 rounded-md dark:hover:bg-primary/20 hover:bg-gray-200 group cust-trans"
            onClick={() => setEditingItem(itemKey)}
          >
            <CiEdit
              size={22}
              className="cursor-pointer text-yellow-600 dark:group-hover:text-yellow-400 group-hover:text-gray-900"
            />
          </button>
        </>
      )}
    </div>
  );
};

export default Item;

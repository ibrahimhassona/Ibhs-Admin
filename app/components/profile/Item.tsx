// Item.tsx
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiContractFill } from "react-icons/ri";
import { Input } from "../ui/input";
interface ItemProps {
  title: string;
  value: string | string[];
  icon?: React.ReactNode; // <-- Change from `Record<IconKeys, ReactNode>` to `ReactNode`
  editingItem: string | null;
  setEditingItem: (key: string | null) => void;
  itemKey: string;
  onSave?: (newValue: string | string[]) => void;
}
const Item:React.FC<ItemProps> = ({ title, value, editingItem, setEditingItem, itemKey, onSave }) => {
  const t = useTranslations("Profile");
  const isEditing = editingItem === itemKey;
  const [editedValue, setEditedValue] = useState(value);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const handleSave = () => {
    onSave?.(editedValue);
    setEditingItem(null);
  };

  return (
    <div className="flex justify-between border-[1px] borderColor p-4 rounded-md overflow-hidden relative">
      {isEditing ? (
        <div className="flex gap-2 w-full h-full items-center justify-between animate-fade-up cust-trans">
          <div className="flex gap-2 w-full h-full items-center justify-between">
            <div className="flex flex-col gap-2 w-full items-center">
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
                aria-label="save"
                name="save"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              >
                {t("save")}
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="cancelBtn"
                aria-label="cancel"
                name="cancel"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setEditingItem(null)}
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="h-full flex flex-col justify-between cust-trans animate-fade-down">
            <h2 className="flex items-center text-sm">
              {<RiContractFill className="me-2 text-primary-dark" size={20} />}
              {title}
            </h2>
            {Array.isArray(value) ? (
              value.map((item, index) => (
                <p key={index} className="text-sm rounded-sm select-none ps-6 max-sm:ps-0 text-gray-400">
                  {item}
                </p>
              ))
            ) : (
              <p className="text-sm rounded-sm select-none ps-6 max-sm:ps-0 text-gray-400">{value}</p>
            )}
          </div>
          <button
            name={t("edit")}
            aria-label={t("edit")}
            className="p-2 rounded-md h-fit dark:hover:bg-primary/20 hover:bg-gray-200 group cust-trans"
            onClick={() => setEditingItem(itemKey)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setEditingItem(itemKey)}
          >
            <CiEdit size={22} className="cursor-pointer cust-trans text-yellow-600 dark:group-hover:text-yellow-400 group-hover:text-gray-900" />
          </button>
        </>
      )}
    </div>
  );
};

export default Item;
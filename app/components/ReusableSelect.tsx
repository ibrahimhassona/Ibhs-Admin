"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import React from "react";

type Option = {
  value: string;
  label: string;
};

interface ReusableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  children?: React.ReactNode;
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "اختر عنصرًا من القائمة",
  className = "",
  name,
  children,
}) => {
  return (
    <div className={className}>

      <Select
        name={name}
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
        <SelectValue>
            {options.find((option) => option.value === value)?.label || placeholder}
        </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {children}
    </div>
  );
};

export default ReusableSelect;

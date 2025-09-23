import React from "react";

interface InputProps {
  value: string | undefined | null;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input = (props: InputProps) => {
  return (
    <input
      className={`w-full text-edusofx-dark text-sm bg-white py-3 px-4 rounded-xl border border-edusofx outline-none focus:ring-2 focus:ring-[#003399] focus:border-[#003399] transition-all duration-200 placeholder:text-edusofx-dark/50 ${props.className}`}
      placeholder={props.placeholder}
      type="text"
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

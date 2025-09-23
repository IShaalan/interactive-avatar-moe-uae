import * as SelectPrimitive from "@radix-ui/react-select";
import { useState } from "react";

import { ChevronDownIcon } from "./Icons";

interface SelectProps<T> {
  options: T[];
  renderOption: (option: T) => React.ReactNode;
  onSelect: (option: T) => void;
  isSelected: (option: T) => boolean;
  value: string | null | undefined;
  placeholder?: string;
  disabled?: boolean;
}

export function Select<T>(props: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectPrimitive.Root
      disabled={props.disabled}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectPrimitive.Trigger className="w-full text-edusofx-dark text-sm bg-white py-2 px-4 rounded-lg cursor-pointer flex items-center justify-between h-fit disabled:opacity-50 min-h-[40px] border border-edusofx hover:border-[#003399] transition-all duration-200">
        <div className={`${props.value ? "text-edusofx-dark" : "text-edusofx-dark/50"}`}>
          {props.value ? props.value : props.placeholder}
        </div>
        <ChevronDownIcon className="w-4 h-4 text-edusofx-dark" />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="z-50 w-[var(--radix-select-trigger-width)] max-h-[300px] overflow-y-auto"
          position="popper"
          sideOffset={5}
        >
          <SelectPrimitive.Viewport className="rounded-xl border border-edusofx bg-white shadow-edusofx-medium py-2">
            {props.options.map((option) => {
              const isSelected = props.isSelected(option);

              return (
                <div
                  key={props.renderOption(option)?.toString()}
                  className={`py-2 px-4 cursor-pointer hover:bg-[#EAEAEC] outline-none text-sm transition-colors duration-200 ${
                    isSelected ? "text-white bg-[#003399]" : "text-edusofx-dark"
                  }`}
                  onClick={() => {
                    props.onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {props.renderOption(option)}
                </div>
              );
            })}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

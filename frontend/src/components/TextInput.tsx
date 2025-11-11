import type { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  name: string;
  value: string;
  className?: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({
  label,
  name,
  placeholder,
  value,
  onChangeValue,
  className,
}: TextInputProps) {
  return (
    <div className={twMerge("flex flex-col dark:text-white", className)}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChangeValue}
        className='mt-2 py-4 px-4 bg-gray-100 dark:bg-dark-blue dark:text-white rounded-md focus:outline-none'
      />
    </div>
  );
}

export default TextInput;

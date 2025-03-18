import React from "react";
import clsx from "clsx";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, error, helperText, options, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        className={clsx(
          "w-full p-3 rounded-lg border outline-none transition-all bg-white",
          error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400",
          "focus:ring-2"
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs text-red-500">{error}</p> : helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

export default Select;

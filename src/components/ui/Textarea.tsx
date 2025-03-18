import React from "react";
import clsx from "clsx";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, helperText, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-white">{label}</label>
      )}
      <div
        className={clsx(
          "relative w-full rounded-lg border transition-all",
          error ? "border-red-500 focus-within:ring-red-400" : "border-gray-300 focus-within:ring-blue-400",
          "focus-within:ring-2"
        )}
      >
        <textarea
          className={clsx(
            "w-full p-3 rounded-lg outline-none dark:text-gray-200 bg-white dark:bg-gray-800 resize-none",
            error ? "border-red-500" : "ring-gray-300",
            "focus:ring-0",
            className
          )}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Textarea;

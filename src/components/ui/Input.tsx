import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
}

export function Input({ label, icon: Icon, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {Icon && (
          <label className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </label>
        )}
        <input
          className={clsx(
            "w-full rounded-xl border px-4 py-2.5 text-sm transition-all ring ring-white outline-none",
            "focus:ring-2 focus:ring-blue-400 focus:border-blue-500",
            "disabled:bg-gray-100 disabled:cursor-not-allowed",
            error ? "border-red-500 focus:ring-red-400" : "border-gray-300",
            Icon ? "pr-10" : "",
            className,
            "text-[#424242] dark:text-[#fff]"
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

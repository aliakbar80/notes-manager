import React from "react";

interface ButtonGroupProps {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, selected, onChange }) => {
  return (
    <div className="flex space-x-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg transition-all ${
            selected === option.value ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

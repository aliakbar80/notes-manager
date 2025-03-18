import React from "react";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio: React.FC<RadioProps> = ({ label, ...props }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="radio" className="w-5 h-5" {...props} />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default Radio;

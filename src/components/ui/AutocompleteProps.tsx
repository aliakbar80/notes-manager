import React, { useState } from "react";

interface AutocompleteProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options, onSelect }) => {
  const [query, setQuery] = useState("");
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
        placeholder="جستجو کنید..."
      />
      {query && (
        <ul className="absolute bg-white border rounded-lg mt-1 w-full shadow-md">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setQuery("");
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
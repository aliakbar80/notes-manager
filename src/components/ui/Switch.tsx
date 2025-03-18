import React, { useState } from "react";

const Switch = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-all ${enabled ? "bg-blue-500" : ""}`}
    >
      <div className={`bg-white w-5 h-5 rounded-full transition-all ${enabled ? "translate-x-6" : ""}`} />
    </button>
  );
};

export default Switch;

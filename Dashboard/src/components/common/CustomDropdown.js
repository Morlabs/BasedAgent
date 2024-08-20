import React, { useState } from "react";
import { primaryColor } from "../../config/config";

const CustomDropdown = ({ id, label, options, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const filteredOptions = options.filter((option) =>
    id === "results"
      ? option
      : option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <div
      className={`${
        id === "results" ? "bg-zinc-700" : "bg-zinc-800"
      } py-3 px-2 rounded w-full md:w-28 lg:w-40 outline-none flex justify-between items-center`}
      >
        <input
          type="text"
          id={id}
          value={inputValue}
          disabled={id === "city" ? true : false}
          readOnly={id === "results" ? true : false}
          placeholder={label}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => {
            // Delay closing to allow click on option
            setTimeout(() => setShowDropdown(false), 200);
          }}
          className={`bg-transparent w-full md:w-20 lg:w-28 outline-none`}
        />
        <img src="https://img.icons8.com/material-sharp/96/FFFFFF/expand-arrow--v1.png" className="w-4 h-4" />
      </div>
      {showDropdown && filteredOptions.length > 0 && (
        <div className="absolute z-10 bg-zinc-800 max-h-72 mt-1 overflow-y-auto rounded w-full md:w-28 lg:w-40 shadow-lg">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setInputValue(option);
                setShowDropdown(false);
                onChange(option);
              }}
              className={`cursor-pointer hover:bg-[${primaryColor}] hover:text-black p-2`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

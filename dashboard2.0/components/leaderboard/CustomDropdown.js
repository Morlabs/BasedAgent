'use client';

import React, { useState } from "react";

const CustomDropdown = ({ id, label, options, onChange, value, countryValue }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  // const [inputValue, setInputValue] = useState(value);

  const filteredOptions = options.filter((option) =>
    id === "results"
      ? option
      : option.toLowerCase().includes(value.toLowerCase())
  );

  const isDisabled = () => {
    if (id === "city") {
      return countryValue !== '' || value ? false : true;
    } else {
      return false;
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        id={id}
        value={value}
        disabled={isDisabled()}
        readOnly={id === "results" ? true : false}
        placeholder={label}
        onChange={(e) => {
          // setInputValue(e.target.value);
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => {
          setTimeout(() => setShowDropdown(false), 500);
        }}
        className={`${
          id === "results" ? "bg-zinc-700" : "bg-zinc-800"
        } py-3 px-2 w-full md:w-28 lg:w-40 rounded outline-none bg-[length:30px_30px] md:bg-[length:15px_15px] lg:bg-[length:30px_30px] bg-no-repeat bg-right bg-[url('https://img.icons8.com/material-sharp/96/FFFFFF/expand-arrow--v1.png')] ${
          id === "city" && isDisabled() ? "opacity-50" : ""
        }`}
      />
      {showDropdown && filteredOptions.length > 0 && (
        <div className="absolute z-10 bg-zinc-800 max-h-72 mt-1 overflow-y-auto rounded w-full md:w-28 lg:w-40 shadow-lg">
          {filteredOptions.map((option, index) => {
            return(
            <div
              key={index}
              onClick={() => {
                // setInputValue(option);
                onChange(option);
                setShowDropdown(false);
              }}
              className={`cursor-pointer hover:bg-[#64D894] hover:text-black p-2`}
            >
              {option}
            </div>
          )})}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

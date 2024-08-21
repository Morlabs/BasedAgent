import React from "react";

const UserLanguages = ({ languages }) => {
  return (
    <div className="p-5">
      <div className="text-lg font-semibold mb-4 hover:underline cursor-pointer">
        LANGUAGE OVERVIEW
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {languages.map((language, index) => (
          <div
            key={index}
            className="bg-zinc-700  rounded-md flex flex-col justify-between"
          >
            <div className="flex justify-between p-2 gap-14 items-center">
              <div className="flex items-center">
                <img
                  src={language.imageUrl}
                  alt={language.name}
                  className="h-8 w-8 mr-2"
                />
                <span className="text-white font-semibold">
                  {language.name}
                </span>
              </div>

              <div className="flex flex-col items-end justify-end">
                <span className="text-white font-semibold my-0">
                  {language.experience}
                </span>
                <span className="text-zinc-400 -mt-[4px] text-xs my-0">
                  exp.
                </span>
              </div>
            </div>
            <div className="h-[1.4px] bg-zinc-600 w-full my-1"></div>
            <div className="text-sm pt-0 p-[2.5px] ">
              <div className="text-gray-400 flex items-start justify-between cursor-pointer p-2 py-1 hover:bg-zinc-600/50 rounded-md">
                <div className="flex flex-col">
                  <span className="text-white font-medium">
                    Top {language.rankWorldwide}%
                  </span>
                  <span className="text-zinc-400 text-xs">
                    out of {language.totalWorldwide}
                  </span>
                </div>
                <span className="text-white font-medium">
                  {language.scopeWorldwide}
                </span>
              </div>
              <div className="text-gray-400 mt-2 flex items-start justify-between cursor-pointer p-2 py-1 hover:bg-zinc-600/50 rounded-md">
                <div className="flex flex-col">
                  <span className="text-white font-medium">
                    Top {language.rankLocal}%
                  </span>
                  <span className="text-zinc-400 text-xs">
                    out of {language.totalLocal}
                  </span>
                </div>
                <span className="text-white font-medium">
                  {language.scopeLocal}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLanguages;
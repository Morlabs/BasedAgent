import React from "react";

const UserTechnologies = ({ technologies }) => {
  return (
    <div className="p-5">
      <div className="text-lg font-semibold mb-4 hover:underline cursor-pointer">
        TECHNOLOGIES
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="bg-zinc-700 hover:bg-zinc-400/50 cursor-pointer px-2 py-2 rounded-md flex items-center gap-4 justify-between"
          >
            <div className="flex items-center">
              <img
                src={tech.imageUrl}
                alt={tech.name}
                className="h-6 w-6 mr-2"
              />
              <span className="text-white text-sm font-semibold">
                {tech.name}
              </span>
            </div>
            <span className="text-gray-200 font-medium">{tech.rank}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTechnologies;
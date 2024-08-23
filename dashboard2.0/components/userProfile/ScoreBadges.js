import React from "react";

const ScoreBadges = ({ data, repos }) => {
  return (
    <div className="bg-zinc-800 text-white p-6 rounded-lg">
      <h2 className="text-lg font-medium mb-4 hover:underline cursor-pointer">
      Achievements
      </h2>
      <div className="flex sm:flex-row flex-col items-start gap-2">
        <div>
          <div className="flex items-center justify-between">
            <div className="border-[1px] text-center border-zinc-600 md:py-4 py-2 md:px-10 px-4">
              <h3 className="text-md font-medium text-gray-100">
                CodersRank Score
              </h3>
              <h2 className="text-xl">{data.score.score}</h2>
            </div>
            <div className="border-[1px] text-center border-zinc-600 md:py-4 py-2 md:px-10 px-4">
              <h3 className="text-md font-medium text-gray-100">
                CodersRank Rank
              </h3>
              <h2 className="text-xl">{data.score.rank}</h2>
            </div>
          </div>

          <div className="flex items-center sm:mt-1 mt-3 sm:my-0 my-2 text-gray-400 text-sm gap-1">
            <span className="text-white font-medium text-lg">Based on:</span>
            <div className="flex items-center gap-1">
              <img
                className="w-5 h-5 rounded-full"
                src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                alt="github"
              />
              <span className="text-zinc-100 underline cursor-pointer">
                {repos} repos
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          {data.badges.slice(0, 3).map((badge, index) => (
            <div
              key={index}
              className="bg-[#72A0A8] py-1 px-6 rounded-sm flex flex-col w-1/3 items-center mx-1"
            >
              <p className="text-md font-semibold text-gray-50">
                {badge.level}
              </p>
              <div className="flex items-center justify-center gap-1">
                <img
                  className="w-5 h-5"
                  src={badge.imgLink}
                  alt={`${badge.name}`}
                />
                <p className="text-sm my-4 font-semibold">{badge.name}</p>
              </div>
              <p className="text-[10px] font-medium text-gray-50">
                {badge.role}
              </p>
              <p className="text-[10px] mt-1 text-gray-50">{badge.country}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-1 text-[#64D894] cursor-pointer flex justify-end text-sm">
        Show all badges
      </div>
    </div>
  );
};

export default ScoreBadges;
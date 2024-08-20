import React from "react";
import { primaryColor, tableData } from "../../config/config";
import { Link } from "react-router-dom";

const LeaderboardTable = ({ data }) => {
  return (
    <div className="w-full">
      {/* table header */}

      <div className="w-full mt-4">
        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-1">
            <span>Rank</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
            <span className="w-1/2">Name</span>
            <span className="w-1/2">Profiles</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
            <span className="w-1/2">Country</span>
            <span className="w-1/2">City</span>
          </div>
          <div className="col-span-1 -mt-6 md:mt-0">
            <span>Experience</span>
          </div>
        </div>
      </div>

      <div className="h-1 bg-zinc-700 w-full my-4"></div>

      {/* table data */}

      <div className="w-full">
        {data?.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-3 md:grid-cols-6 py-3">
              <div className="col-span-1">
                <span className="text-sm">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}.
                </span>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
                <Link
                  to={`/profile/${item?.id}`}
                  className={`w-1/2 text-sm text-[${primaryColor}] hover:underline cursor-pointer`}
                >
                  {item?.name}
                </Link>
                <span className="w-1/2 flex justify-start">
                  <img className="w-6 h-6" src="/favicon.png" />
                  <a href={item?.github_url}>
                    <img
                      className="w-6 h-6 ml-2"
                      src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"
                    />
                  </a>
                </span>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
                <span
                  className={`w-1/2 text-xl text-[${primaryColor}] cursor-pointer`}
                >
                  {item?.country}
                </span>
                <span
                  className={`w-1/2 text-sm text-[${primaryColor}] hover:underline cursor-pointer`}
                >
                  {item?.city}
                </span>
              </div>
              <div className="col-span-1 -mt-6 md:mt-0">
                <span className="text-sm font-semibold">{item?.points}</span>
              </div>
            </div>
            <div className="h-[1px] bg-zinc-700 w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;

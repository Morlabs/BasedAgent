import React from "react";
import Link from "next/link";
import { primaryColor } from "@/config/config";
import CountryFlag from "./CountryFlag";

const LeaderboardTable = ({ data, handlePress, currentUser }) => {
  return (
    <div className="w-full px-2">
      {/* table header */}
      <div className="w-full mt-4 px-2 md:px-10">
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
            <span>Weight</span>
          </div>
        </div>
      </div>

      <div className="h-1 bg-zinc-700 w-full my-4"></div>

      {/* table data */}
      <div className="w-full mb-4 bg-zinc-700 rounded px-2 md:px-10">
        <div className="grid grid-cols-3 md:grid-cols-6 py-3">
          <div className="col-span-1">
            <span className="text-sm">{564}.</span>
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
            <Link
              href={`/user/${currentUser?.id}`}
              className={`w-1/2 text-sm text-[${primaryColor}] hover:underline cursor-pointer`}
            >
              {currentUser?.name}
            </Link>
            <span className="w-1/2 flex justify-start">
              <img className="w-6 h-6" src="/favicon.png" />
              <a href={currentUser?.github_url}>
                <img
                  className="w-6 h-6 ml-2"
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"
                />
              </a>
            </span>
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
            <span
              className={`w-8 cursor-pointer`}
              onClick={() => handlePress("country", currentUser?.country)}
            >
              <CountryFlag countryName={currentUser?.country} />
            </span>
            <span
              className={`w-1/2 text-sm text-[${primaryColor}] hover:underline cursor-pointer`}
              onClick={() => handlePress("city", currentUser?.city)}
            >
              {currentUser?.city}
            </span>
          </div>
          <div className="col-span-1 -mt-6 md:mt-0">
            <span className="text-sm font-semibold">{currentUser?.weight}</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        {data?.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-3 md:grid-cols-6 py-3 px-2 md:px-10">
              <div className="col-span-1">
                <span className="text-sm">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}.
                </span>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
                <Link
                  href={`/user/${item?.id}`}
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
                  className={`w-8 cursor-pointer`}
                  onClick={() => handlePress("country", item?.country)}
                >
                  <CountryFlag countryName={item?.country} />
                </span>
                <span
                  className={`w-1/2 text-sm text-[${primaryColor}] hover:underline cursor-pointer`}
                  onClick={() => handlePress("city", item?.city)}
                >
                  {item?.city}
                </span>
              </div>
              <div className="col-span-1 -mt-6 md:mt-0">
                <span className="text-sm font-semibold">{item?.weight}</span>
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

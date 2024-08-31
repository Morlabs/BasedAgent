import React from "react";
import Link from "next/link";
import { primaryColor } from "@/config/config";
import LoaderLocal from "../common/loaderLocal";

const LeaderboardTable = ({
  data,
  handlePress,
  currentUser,
  handleSearchFilter,
}) => {

  console.log('currentUser', currentUser)
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
      {currentUser && (
        <div className="w-full mb-4 bg-zinc-700 rounded px-2 md:px-10">
          <div className="grid grid-cols-3 md:grid-cols-6 py-3 items-center">
            <div className="col-span-1">
              <span className="text-sm">{564}.</span>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 items-center">
              <Link
                href={`/user/${currentUser?.id}`}
                className={`w-1/2 text-sm text-[${primaryColor}] hover:underline cursor-pointer`}
              >
                {currentUser?.name}
              </Link>
              <span className="w-1/2 flex justify-start">
                <img className="w-6 h-6" src="/favicon.png" />
                <a href={currentUser?.githubUrl} target="_blank">
                  <img
                    className="w-6 h-6 ml-2"
                    src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"
                  />
                </a>
              </span>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 items-center">
              <span
                className={`w-8 cursor-pointer text-xl`}
                onClick={() => {
                  handlePress("country", currentUser?.country?.name || "");
                  handleSearchFilter(
                    "country",
                    currentUser?.country?.name || null
                  );
                }}
              >
                {currentUser?.country?.code ? (
                  <img
                    src={`https://flagsapi.com/${currentUser?.country?.code}/flat/64.png`}
                  />
                ) : (
                  <img className="w-6 h-6" src="/favicon.png" />
                )}
              </span>
              <span
                className={`w-1/2 text-sm text-[${primaryColor}] hover:underline cursor-pointer`}
                onClick={() => {
                  handlePress("city", currentUser?.city || "");
                  handleSearchFilter("city", currentUser?.city || null);
                }}
              >
                {currentUser?.city || "unknown"}
              </span>
            </div>
            <div className="col-span-1 -mt-6 md:mt-0">
              <span className="text-sm font-semibold">
                {currentUser?.githubDetails?.weight || 0}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="w-full">
        {data ? (
          <>
            {data?.map((item, index) => {
              return (
                <div key={index}>
                  <div className="grid grid-cols-3 md:grid-cols-6 py-3 px-2 md:px-10 items-center">
                    <div className="col-span-1">
                      <span className="text-sm">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}.
                      </span>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 item-center">
                      <Link
                        href={`/user/${item?.id}`}
                        className={`w-1/2 text-sm text-[${primaryColor}] hover:underline cursor-pointer`}
                      >
                        {item?.name}
                      </Link>
                      <span className="w-1/2 flex justify-start">
                        <img className="w-6 h-6" src="/favicon.png" />
                        <a href={item?.githubUrl} target="_blank">
                          <img
                            className="w-6 h-6 ml-2"
                            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"
                          />
                        </a>
                      </span>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-0">
                      <span
                        className={`w-8 cursor-pointer text-3xl`}
                        onClick={() => {
                          handlePress("country", item?.country?.name || "")
                          handleSearchFilter("country", item?.country?.name || null);
                        }
                        }
                      >
                        {item?.country?.code ? (
                          <img
                            src={`https://flagsapi.com/${item?.country?.code}/flat/64.png`}
                          />
                        ) : (
                          <img className="w-6 h-6" src="/favicon.png" />
                        )}
                      </span>
                      <span
                        className={`w-1/2 text-sm text-[${primaryColor}] hover:underline cursor-pointer`}
                        onClick={() => {
                          handlePress("city", item?.city || "")
                          handleSearchFilter("city", item?.city || null);
                        }}
                      >
                        {item?.city || "unknown"}
                      </span>
                    </div>
                    <div className="col-span-1 -mt-6 md:mt-0">
                      <span className="text-sm font-semibold">
                        {item?.weight || 0}
                      </span>
                    </div>
                  </div>
                  <div className="h-[1px] bg-zinc-700 w-full"></div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="w-full flex justify-center">
            <LoaderLocal />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardTable;

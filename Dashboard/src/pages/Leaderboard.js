import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeaderboardFilters from "../components/common/LeaderboardFilters";
import LeaderboardTable from "../components/common/LeaderboardTable";
import CustomDropdown from "../components/common/CustomDropdown";
import { getDeveloperList } from "../request/request";

const Leaderboard = () => {

  const [developers, setDeveloper] = useState([]);

  useEffect(() => {
    async function getlist() {
      const list = await getDeveloperList('list');
      console.log(list)
      setDeveloper(list?.developers);
    }
    getlist();
  }, [])

  return (
    <div className="px-4 xl:px-0">
      <Header />
      <div className="flex justify-between md:items-center py-10 flex-col md:flex-row">
        <div className="mb-4 md:mb-0">
          <span className="uppercase text-xl font-medium">top developers</span>
        </div>

        <LeaderboardFilters />
      </div>
      <div className="flex flex-col items-center bg-zinc-800 py-10 px-2 md:px-10 gap-4 rounded">
        <span className="text-[20px] lg:w-2/3 text-center mb-2">
          Interested in hiring someone from this list? Try BasedAgent and access
          10 times more profiles with more data and search faster.
        </span>

        <div className="reviewer-form font-bold">
          <button>Try out for free</button>
        </div>

        <LeaderboardTable data={developers} />

        <div className="flex justify-between flex-col md:flex-row gap-4 w-full mt-6">
          <div className="flex gap-3 items-center">
            <span className="text-gray-400">Results:</span>

            <CustomDropdown
              key={'results'}
              id={'results'}
              label={20}
              options={['20', '30', '40', '50']}
              onChange={(value) => {
                // handleCarDetailsChange(detail.id, value)
              }}
            />

          </div>
          <div className="flex items-center gap-2">
            <div className="reviewer-form">
              <button className="font-extrabold">
                <img src="/left_arrow.png" className="w-6 h-6" />
              </button>
            </div>
            <input
              type="tel"
              value={1}
              className="bg-zinc-700 rounded px-4 py-2 w-16 outline-none"
            />
            <span className="mx-2">of 3,343</span>
            <div className="reviewer-form">
              <button className="font-extrabold">
                <img src="/right_arrow.png" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;

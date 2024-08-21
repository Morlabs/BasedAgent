'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  {
    name: "Jan 2022",
    'C#': 4000,
    'C++': 2400,
    HTML: 2400,
    Java: 2400,
    JavaScript: 2400,
    Kotlin: 2400,
    other: 2400,
  },
  {
    name: "Jan 2024",
    'C#': 4000,
    'C++': 2400,
    HTML: 2400,
    Java: 2400,
    JavaScript: 2400,
    Kotlin: 2400,
    other: 2400,
  },
  {
    name: "Feb 2024",
    'C#': 2000,
    'C++': 1400,
    HTML: 4400,
    Java: 2410,
    JavaScript: 5400,
    Kotlin: 240,
    other: 440,
  },
  {
    name: "Mar 2024",
    'C#': 500,
    'C++': 400,
    HTML: 2700,
    Java: 3400,
    JavaScript: 6400,
    Kotlin: 240,
    other: 10,
  },
  {
    name: "Apr 2024",
    'C#': 746,
    'C++': 200,
    HTML: 280,
    Java: 2200,
    JavaScript: 540,
    Kotlin: 240,
    other: 200,
  },
];

const TechSkillsGraph = () => {
  return (
    <div className="w-full px-4 py-6 bg-zinc-800 rounded-lg">
      <span className="text-xl font-semibold uppercase hover:underline cursor-pointer">
      Experience Timeline
      </span>
      <div className="w-full flex justify-end my-4">
        <span className="text-sm text-end self-end">
          Highest experience points: 21329 points, 01 Jun 2020
        </span>
      </div>
      <ResponsiveContainer
        height={400}
        className={"h-72 w-full border-2 border-zinc-700 rounded"}
      >
        <AreaChart
          height={400}
          data={generateDummyData()}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" className="text-sm " />
          {/* <Tooltip labelClassName="text-black" /> */}
          <Area
            type="monotone"
            dataKey="C#"
            stackId="1"
            stroke="#178600"
            fill="#178600"
          />
          <Area
            type="monotone"
            dataKey="C++"
            stackId="1"
            stroke="#f34b7d"
            fill="#f34b7d"
          />
          <Area
            type="monotone"
            dataKey="HTML"
            stackId="1"
            stroke="#e34c26"
            fill="#e34c26"
          />
          <Area
            type="monotone"
            dataKey="Java"
            stackId="1"
            stroke="#b07219"
            fill="#b07219"
          />
          <Area
            type="monotone"
            dataKey="JavaScript"
            stackId="1"
            stroke="#f1e05a"
            fill="#f1e05a"
          />
          <Area
            type="monotone"
            dataKey="Kotlin"
            stackId="1"
            stroke="#F18E33"
            fill="#F18E33"
          />
          <Area
            type="monotone"
            dataKey="Other"
            stackId="1"
            stroke="#bbb"
            fill="#bbb"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <div className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-full bg-[#178600]`}></div>
            <span>C#</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-full bg-[#f34b7d]`}></div>
            <span>C++</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-full bg-[#e34c26]`}></div>
            <span>HTML</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-full bg-[#b07219]`}></div>
            <span>Java</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-full bg-[#f1e05a]`}></div>
            <span>JavaScript</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-full bg-[#F18E33]`}></div>
            <span>Kotlin</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-full bg-[#bbb]`}></div>
            <span>Other</span>
          </div>
      </div>
    </div>
  );
};

export default TechSkillsGraph;

const generateDummyData = () => {
  const data = [];
  const languages = ['C#', 'C++', 'HTML', 'Java', 'JavaScript', 'Kotlin', 'other'];

  for (let i = 0; i < 100; i++) {
    const obj = {
      name: `Month ${i + 1} 2024`
    };
    languages.forEach(lang => {
      obj[lang] = Math.floor(Math.random() * 5000) + 1; // Random value between 1 and 5000
    });
    data.push(obj);
  }
  console.log('dta', data)
  return data;
};
generateDummyData()
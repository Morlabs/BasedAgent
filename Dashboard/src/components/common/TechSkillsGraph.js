import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { techSkills } from "../../config/config";

const data = [
  {
    name: "Jan 2024",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb 2024",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar 2024",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr 2024",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May 2024",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "June 2024",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul 2024",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const TechSkillsGraph = () => {
  return (
    <div className="w-full px-4 py-6 bg-zinc-800 rounded-lg">
      <span className="text-xl font-semibold uppercase hover:underline cursor-pointer">
        Tech Skills
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
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" className="text-sm " />
          <Tooltip labelClassName="text-black" />
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="amt"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {techSkills.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-full bg-[${item.color}]`}></div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechSkillsGraph;

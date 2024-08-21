import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    technology: "JavaScript",
    startYear: 2010,
    endYear: 2017
  },
  {
    technology: "React",
    startYear: 2010,
    endYear: 2015
  },
  {
    technology: "Node.js",
    startYear: 2010,
    endYear: 2019
  }
];

const processData = data.map(item => ({
  technology: item.technology,
  duration: item.endYear - item.startYear,
  startYear: item.startYear,
  endYear: item.endYear
}));

const HorizontalBarChart = () => {
  return (
    <div className="w-full px-4 py-6 bg-zinc-800 rounded-lg">
      <span className="text-xl font-semibold uppercase hover:underline cursor-pointer">
        Tech Skills
      </span>
     
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical"
        width={600}
        height={300}
        data={processData}
        margin={{
          top: 20,
          right: 20,
          left: 40,
          bottom: 0
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          type="number"
          domain={[2010, 2020]} 
          tickCount={10} 
          dataKey="endYear"
          label={{ value: "", position: "insideBottomRight" }}
          
        />
        <YAxis
          type="category"
          dataKey="technology"
          label={{ value: "" }}
        />
        {/* <Tooltip /> */}
        <Legend />
        <Bar
          dataKey="endYear"
          fill="#8884d8"
          name="Years of Experience"
          // label={{
          //   position: "right",
          //   formatter: (value) => `${value} years`
          // }}
        />
      </BarChart>
    </ResponsiveContainer>


    </div>
  );
};

export default HorizontalBarChart;

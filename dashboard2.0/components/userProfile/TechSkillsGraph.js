"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "May 2002",
    "Dec 2004",
    "Jul 2007",
    "Feb 2010",
    "Sep 2012",
    "Apr 2015",
    "Nov 2017",
    "Jun 2020",
  ],
  datasets: [
    {
      label: "C#",
      data: [0, 0, 0, 2000, 3000, 3500, 3900, 3993],
      backgroundColor: "rgba(0, 128, 0, 0.7)",
      fill: true,
      pointRadius: 0,
    },
    {
      label: "C++",
      data: [0, 0, 100, 200, 300, 300, 319, 319],
      backgroundColor: "rgba(255, 0, 0, 0.7)",
      fill: true,
       pointRadius: 0,
    },
    {
      label: "HTML",
      data: [0, 0, 0, 300, 400, 500, 700, 720],
      backgroundColor: "rgba(255, 165, 0, 0.7)",
      fill: true,
       pointRadius: 0,
    },
    {
      label: "Java",
      data: [0, 0, 50, 300, 500, 600, 680, 688],
      backgroundColor: "rgba(255, 255, 0, 0.7)",
      fill: true,
       pointRadius: 0,
    },
    {
      label: "JavaScript",
      data: [0, 0, 0, 1500, 2500, 3000, 3600, 3742],
      backgroundColor: "rgba(0, 128, 128, 0.7)",
      fill: true,
       pointRadius: 0,
    },
    {
      label: "Kotlin",
      data: [0, 0, 0, 0, 0, 200, 1000, 1275],
      backgroundColor: "rgba(255, 69, 0, 0.7)",
      fill: true,
       pointRadius: 0,
    },
    {
      label: "Other",
      data: [0, 0, 50, 1500, 4000, 5000, 6500, 7066],
      backgroundColor: "rgba(128, 128, 128, 0.7)",
      fill: true,
       pointRadius: 0,
    },
  ],
};

const TechSkillsGraph = () => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

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

      <Line data={data} options={options} />

      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#178600]"></div>
          <span>C#</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#f34b7d]"></div>
          <span>C++</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#e34c26]"></div>
          <span>HTML</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#b07219]"></div>
          <span>Java</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#f1e05a]"></div>
          <span>JavaScript</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#F18E33]"></div>
          <span>Kotlin</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#bbb]"></div>
          <span>Other</span>
        </div>
      </div>
      
    </div>
  );
};
export default TechSkillsGraph;

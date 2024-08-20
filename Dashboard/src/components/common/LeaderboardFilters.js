import React from "react";
import { filterOptions, SortOptions } from "../../config/config";
import CustomDropdown from "./CustomDropdown";

const LeaderboardFilters = () => {
  return (
    <div className="flex gap-4 md:items-center flex-col md:flex-row">
      <span className="text-gray-400">Filter by:</span>
      {filterOptions.map((detail) => (
        <CustomDropdown
          key={detail.id}
          id={detail.id}
          label={detail.label}
          options={detail.datalistOptions}
          onChange={(value) => {
            // handleCarDetailsChange(detail.id, value)
          }}
        />
      ))}
      <span className="text-gray-400">Sort by:</span>
      <CustomDropdown
        key={SortOptions.id}
        id={SortOptions.id}
        label={SortOptions.label}
        options={SortOptions.datalistOptions}
        onChange={(value) => {
          // handleCarDetailsChange(detail.id, value)
        }}
      />
    </div>
  );
};

export default LeaderboardFilters;

"use client";

import React, { Suspense } from "react";
import LeaderboardPage from './LeaderboardPage';

const Leaderboard = () => {

  return (
   <Suspense>
    <LeaderboardPage />
   </Suspense>
  );
};

export default Leaderboard;

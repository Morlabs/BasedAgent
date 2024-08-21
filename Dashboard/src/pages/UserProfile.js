import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserIntro from "../components/common/UserIntro";
import TechSkillsGraph from "../components/common/TechSkillsGraph";
import UserScoreBadges from "../components/common/UserScoreBadges";
import {
  languages,
  scoreAndbadges,
  technologies,
  userData,
} from "../config/config";
import UserTechnologies from "../components/common/UserTechnologies";
import UserLanguages from "../components/common/UserLanguages";
import TimelineGraph from "../components/common/TimelineGraph";

const UserProfile = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <div className="py-10 px-4">
        <UserIntro data={userData} />

        <div className="h-8" />

        <UserScoreBadges data={scoreAndbadges} />

        <div className="h-8" />

        <TechSkillsGraph />

        <div className="h-8" />

        <TimelineGraph/>

        <div className="h-8" />

        <div className="bg-zinc-800 text-white rounded-lg">
          <UserLanguages languages={languages} />
          <div className="h-[0.5px] bg-zinc-600 w-full" />
          <UserTechnologies technologies={technologies} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;

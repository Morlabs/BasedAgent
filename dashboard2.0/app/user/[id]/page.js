'use client';

import Header from "@/components/Header";
import ScoreBadges from "@/components/userProfile/ScoreBadges";
import TechSkillsGraph from "@/components/userProfile/TechSkillsGraph";
import LanguagesAndTechnologies from "@/components/userProfile/LanguagesAndTechnologies";
import Footer from "@/components/Footer";
import TimelineGraph from "@/components/userProfile/TimelineGraph";
import UserIntro from "@/components/userProfile/UserIntro";


//TODO : Make data dynamic here


import {
	languages,
	scoreAndbadges,
	technologies,
	userData,
} from "@/config/config";
import {useParams} from "next/navigation";

const User = () => {
	const {id} = useParams();
	
	return (
		<div>
			<Header/>
			<div className="py-10 px-4">
				<UserIntro data={userData}/>
				
				<div className="h-8"/>
				
				<ScoreBadges data={scoreAndbadges}/>
				
				<div className="h-8"/>
				
				<TechSkillsGraph/>
				
				<div className="h-8"/>
				
				<TimelineGraph/>
				
				<div className="h-8"/>
				
				<LanguagesAndTechnologies
					languages={languages}
					technologies={technologies}
				/>
			</div>
			<Footer/>
		</div>
	);
};

export default User;

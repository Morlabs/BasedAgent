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
import { useEffect, useState } from "react";
import { getDeveloper } from "@/actions/developer.api";

const User = () => {
	const {id} = useParams();

	const [profileData, setProfileData] = useState(null);
	const [topLanguages, setTopLanguages] = useState(null);

	useEffect(() => {
		const getProfileData = async () => {
			const developer = await getDeveloper(id);
			setProfileData(developer);
			filterLanguages(developer);

			console.log('user', developer);
		}

		getProfileData();
	}, [])

	const filterLanguages = (developer) => {
		const tLanguages = languages.filter((language) => {
			return developer?.topLanguages.includes(language.name);
		})
		console.log('top', tLanguages)
		setTopLanguages(tLanguages)
	}
	
	return (
		<div>
			<Header/>
			<div className="py-10 px-4">
				<UserIntro data={profileData}/>
				
				<div className="h-8"/>
				
				<ScoreBadges data={scoreAndbadges} repos={profileData?.publicRepositories} />
				
				<div className="h-8"/>
				
				<TechSkillsGraph/>
				
				<div className="h-8"/>
				
				<TimelineGraph/>
				
				<div className="h-8"/>
				
				<LanguagesAndTechnologies
					languages={topLanguages}
					technologies={technologies}
				/>
			</div>
			<Footer/>
		</div>
	);
};

export default User;

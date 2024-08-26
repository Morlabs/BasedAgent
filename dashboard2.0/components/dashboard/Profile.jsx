import React, {useState, useEffect} from "react";
import Combobox from "./formUI/Combobox";
import ToggleSwitch from "./formUI/ToggleSwitch";
import {getProfile, upsertProfile} from "@/actions/profile.api";
import LoaderLocal from "@/components/common/loaderLocal";
import {countries} from "@/utils/constants/countries";

function Profile({id}) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [genderIdentity, setGenderIdentity] = useState("Male");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [currentLocation, setCurrentLocation] = useState("");
	const [primaryEmail, setPrimaryEmail] = useState("");
	const [linkedinUrl, setLinkedinUrl] = useState("");
	const [portfolioWebsite, setPortfolioWebsite] = useState("");
	const [twitterHandle, setTwitterHandle] = useState("");
	const [profileDiscoverability, setProfileDiscoverability] = useState(true);
	const [loading, setLoading] = useState(true);
	
	// Fetch initial profile data from API
	useEffect(() => {
		async function fetchProfile() {
			setLoading(true);
			const profileData = await getProfile(id);
			console.log("profileData:", profileData);
			if (profileData) {
				setFirstName(profileData.firstName || "");
				setLastName(profileData.lastName || "");
				
				// Parse the genderIdentity JSON string before setting it
				const parsedGenderIdentity = profileData.genderIdentity
					? JSON.parse(profileData.genderIdentity)
					: {id: 1, name: "Male"};
				
				setGenderIdentity(parsedGenderIdentity);
				setDateOfBirth(profileData.dateOfBirth || "");
				setCurrentLocation(
					profileData.currentLocation
						? typeof profileData.currentLocation !== "string"
							? JSON.parse(profileData.currentLocation)
							: profileData.currentLocation
						: {}
				);
				console.log('location', profileData.currentLocation)
				setPrimaryEmail(profileData.primaryEmail || "");
				setLinkedinUrl(profileData.linkedinUrl || "");
				setPortfolioWebsite(profileData.portfolioWebsite || "");
				setTwitterHandle(profileData.twitterHandle || "");
				setProfileDiscoverability(profileData.profileDiscoverability || true);
			}
			setLoading(false);
		}
		
		fetchProfile();
	}, [id]);
	
	async function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		
		const profileData = {
			id, // Pass the id to identify the profile
			first_name: firstName,
			last_name: lastName,
			gender_identity: genderIdentity,
			date_of_birth: dateOfBirth,
			current_location: currentLocation,
			primary_email: primaryEmail,
			linkedin_url: linkedinUrl,
			portfolio_website: portfolioWebsite,
			twitter_handle: twitterHandle,
			profile_discoverability: profileDiscoverability,
		};
		
		try {
			await upsertProfile(profileData);
			console.log("Profile saved successfully.");
		} catch (error) {
			console.error("Error saving profile data:", error);
		} finally {
			setLoading(false);
		}
	}
	
	if (loading) {
		return (
			<div className="flex flex-col justify-center items-center h-screen">
				<LoaderLocal/>
				<div className="mt-4 text-center">Loading</div>
			</div>
		);
	}
	
	return (
		<>
			
			<form
				method="POST"
				className="divide-y divide-gray-200 lg:col-span-9"
				onSubmit={handleSubmit}
			>
				{/* Profile section */}
				<div className="px-4 py-6 sm:p-6 lg:pb-8">
					<div>
						<h2 className="text-lg font-medium leading-6 text-[#dadee2]">
							Profile
						</h2>
						<p className="mt-1 text-sm text-[#dadee2]">
							This information will be displayed publicly so be careful what you
							share.
						</p>
					</div>
					
					<div className="mt-6 grid grid-cols-12 gap-6">
						<div className="col-span-12 sm:col-span-6">
							<label
								htmlFor="first-name"
								className="block text-sm font-medium leading-6 text-[#dadee2]"
							>
								First name
							</label>
							<input
								id="first-name"
								name="first-name"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								autoComplete="given-name"
								className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"
							/>
						</div>
						
						<div className="col-span-12 sm:col-span-6">
							<label
								htmlFor="last-name"
								className="block text-sm font-medium leading-6 text-[#dadee2]"
							>
								Last name
							</label>
							<input
								id="last-name"
								name="last-name"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								autoComplete="family-name"
								className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"
							/>
						</div>
						
						<div className="col-span-12 sm:col-span-6">
							<label
								htmlFor="gender-identity"
								className="block text-sm font-medium leading-6 text-[#dadee2]"
							>
								Gender
							</label>
							<Combobox
								options={[
									{id: 1, name: "Male"},
									{id: 2, name: "Female"},
									{id: 3, name: "Other"},
								]}
								selected={genderIdentity}
								onChange={setGenderIdentity}
								placeholder="Select Gender"
							/>
						</div>
						
						<div className="col-span-12 sm:col-span-6">
							<label
								htmlFor="date-of-birth"
								className="block text-sm font-medium leading-6 text-[#dadee2]"
							>
								Date of Birth
							</label>
							<input
								id="date-of-birth"
								name="date-of-birth"
								type="date"
								value={dateOfBirth}
								onChange={(e) => setDateOfBirth(e.target.value)}
								className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] placeholder:text-gray-400 sm:text-sm sm:leading-6"
							/>
						</div>
						
						<div className="col-span-12">
							<label
								htmlFor="current-location"
								className="block text-sm font-medium leading-6 text-[#dadee2]"
							>
								Location
							</label>
							<Combobox
								options={countries}
								selected={currentLocation}
								onChange={setCurrentLocation}
								placeholder="Select Country"
							/>
						</div>
						
						<div className="col-span-12 sm:col-span-6">
							<label
								htmlFor="primary-email"
								className="block text-sm font-medium leading-6 text-[#dadee2]"
							>
								Primary Email
							</label>
							<input
								id="primary-email"
								name="primary-email"
								type="email"
								value={primaryEmail}
								onChange={(e) => setPrimaryEmail(e.target.value)}
								autoComplete="email"
								className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"
							/>
						</div>
						
						<div className="col-span-12 sm:col-span-6">
							<label
								htmlFor="linkedin-url"
								className="block text-sm font-medium leading-6 text-[#dadee2]"
							>
								LinkedIn URL
							</label>
							<input
								id="linkedin-url"
								name="linkedin-url"
								type="text"
								value={linkedinUrl}
								onChange={(e) => setLinkedinUrl(e.target.value)}
								className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"
							/>
						</div>
						
						<div className="col-span-12 sm:col-span-6">
							<label
								htmlFor="portfolio-website"
								className="block text-sm font-medium leading-6 text-[#dadee2]"
							>
								Portfolio Website
							</label>
							<input
								id="portfolio-website"
								name="portfolio-website"
								type="text"
								value={portfolioWebsite}
								onChange={(e) => setPortfolioWebsite(e.target.value)}
								className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"
							/>
						</div>
						
						<div className="col-span-12 sm:col-span-6">
							<label
								htmlFor="twitter-handle"
								className="block text-sm font-medium leading-6 text-[#dadee2]"
							>
								Twitter Handle
							</label>
							<input
								id="twitter-handle"
								name="twitter-handle"
								type="text"
								value={twitterHandle}
								onChange={(e) => setTwitterHandle(e.target.value)}
								className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"
							/>
						</div>
						
						<div className="col-span-12 sm:col-span-6">
							<label
								htmlFor="profile-discoverability"
								className="block text-sm font-medium leading-6 text-[#dadee2]"
							>
								Profile Discoverability
							</label>
							<div className="mt-2">
								<ToggleSwitch
									isChecked={profileDiscoverability}
									onToggle={setProfileDiscoverability}
								/>
							</div>
						</div>
					</div>
					
					<div className="mt-6">
						<button
							type="submit"
							className="bg-blue-500 text-white py-2 px-4 rounded"
						>
							Save Profile
						</button>
					</div>
				</div>
			</form>
		</>
	
	
	)
		;
}

export default Profile;

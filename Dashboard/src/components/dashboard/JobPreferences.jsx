import React, {useState, useEffect} from 'react';
import TagInput from './formUI/TagInput';
import ToggleSwitch from './formUI/ToggleSwitch';
import Combobox from './formUI/Combobox';
import {backendUrl} from '../../constants/urls';
import axios from "axios";

function JobPreferences() {
	const [desiredPositions, setDesiredPositions] = useState([]);
	const [targetIndustry, setTargetIndustry] = useState([]);
	const [openToRemoteWork, setOpenToRemoteWork] = useState(false);
	const [employmentType, setEmploymentType] = useState('');
	const [compensationExpectations, setCompensationExpectations] = useState('');
	const [techStackDislikes, setTechStackDislikes] = useState([]);
	const [idealCompanyScale, setIdealCompanyScale] = useState('');
	
	useEffect(() => {
		async function fetchData() {
			try {
				const userID = 1; // or any other dynamic value
				const response = await axios.get(`/api/job-preferences?id=${userID}`);
				const result = response.data;
				const data = result.data;
				setDesiredPositions(data.desired_positions || []);
				setTargetIndustry(data.target_industry || []);
				setOpenToRemoteWork(data.open_to_remote_work || false);
				setEmploymentType(data.employment_type || '');
				setCompensationExpectations(data.compensation_expectations || '');
				setTechStackDislikes(data.tech_stack_dislikes || []);
				setIdealCompanyScale(data.ideal_company_scale || '');
			} catch (error) {
				console.error('Error fetching job preferences:', error);
			}
		}
		
		fetchData();
	}, []);
	
	async function handleSubmit(event) {
		event.preventDefault();
		
		const formData = {
			desired_positions: desiredPositions,
			target_industry: targetIndustry,
			open_to_remote_work: openToRemoteWork,
			employment_type: employmentType.name,
			compensation_expectations: compensationExpectations,
			tech_stack_dislikes: techStackDislikes,
			ideal_company_scale: idealCompanyScale.name
		};
		
		try {
			const response = await fetch(`${`${backendUrl}/api/job-preferences/1`}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				const result = await response.json();
				console.log('Data saved successfully:', result);
				// Handle successful save (e.g., show a success message)
			} else {
				console.error('Failed to save data:', response.statusText);
				// Handle error response (e.g., show an error message)
			}
		} catch (error) {
			console.error('Error saving job preferences:', error);
			// Handle network error (e.g., show an error message)
		}
	}
	
	return (
		<>
			<form action="#" method="POST" className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleSubmit}>
				<div className="px-4 py-6 sm:p-6 lg:pb-8">
					<div>
						<h2 className="text-lg font-medium leading-6 text-[#dadee2]">Job Preferences</h2>
						<p className="mt-1 text-sm text-[#dadee2]">
							Let us know what you're looking for.
						</p>
					</div>
					
					<div className="mt-6 grid grid-cols-1 gap-y-6">
						<div>
							<label htmlFor="desiredPositions"
										 className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
								Desired Positions
							</label>
							<TagInput
								tags={desiredPositions}
								setTags={setDesiredPositions}
								placeholder="Add desired positions"
							/>
						</div>
						
						<div>
							<label htmlFor="targetIndustries"
										 className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
								Target Industries
							</label>
							<TagInput
								tags={targetIndustry}
								setTags={setTargetIndustry}
								placeholder="Add target industries"
							/>
						</div>
						
						<div>
							<label htmlFor="openToRemote" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
								Open to Remote
							</label>
							<div className="mt-2">
								<ToggleSwitch
									label=""
									description=""
									isChecked={openToRemoteWork}
									onToggle={setOpenToRemoteWork}
								/>
							</div>
						</div>
						
						<div>
							<label htmlFor="employmentType" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
								Employment Type
							</label>
							<div className="mt-2">
								<Combobox
									options={[
										{
											id: 'full-time',
											name: 'Full-time'
										},
										{
											id: 'part-time',
											name: 'Part-time'
										},
										{
											id: 'contract',
											name: 'Contract'
										}
									]}
									selected={employmentType}
									onChange={setEmploymentType}
									placeholder="Select employment type"
								/>
							</div>
						</div>
						
						<div>
							<label htmlFor="compensationExpectations"
										 className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
								Compensation Expectations
							</label>
							<div className="mt-2">
								<input
									id="compensationExpectations"
									name="compensationExpectations"
									type="text"
									autoComplete="compensationExpectations"
									value={compensationExpectations}
									onChange={(e) => setCompensationExpectations(e.target.value)}
									className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						
						<div>
							<label htmlFor="techStackDislikes"
										 className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
								Tech Stack Dislikes
							</label>
							<TagInput
								tags={techStackDislikes}
								setTags={setTechStackDislikes}
								placeholder="Add tech stack dislikes"
							/>
						</div>
						
						<div>
							<label htmlFor="idealCompanySize"
										 className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
								Ideal Company Size
							</label>
							<div className="mt-2">
								<Combobox
									options={[
										{
											id: 1,
											name: 'Small'
										},
										{
											id: 2,
											name: 'Medium'
										},
										{
											id: 3,
											name: 'Large'
										}
									]}
									selected={idealCompanyScale}
									onChange={setIdealCompanyScale}
									placeholder="Select ideal company size"
								/>
							</div>
						</div>
					</div>
					<div className="mt-6">
						<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
							Save Preferences
						</button>
					</div>
				</div>
			</form>
		</>
	);
}

export default JobPreferences;

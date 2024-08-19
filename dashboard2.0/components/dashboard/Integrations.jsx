import React, {useState, useEffect} from 'react';
import Button from './formUI/Button';
import {backendUrl} from '@/utils/constants/urls';
import axios from 'axios';

const integrationsData = {
	github_oauth: false,
	github_personal_access_token: '',
	gitlab_oauth: false,
	gitlab_self_hosted_oauth: false,
	bitbucket_oauth: false,
	stackoverflow_oauth: false,
};
const userID = 1

function Integrations() {
	const [githubOauth, setGithubOauth] = useState(integrationsData.github_oauth);
	const [githubPersonalAccessToken, setGithubPersonalAccessToken] = useState(integrationsData.github_personal_access_token);
	const [gitlabOauth, setGitlabOauth] = useState(integrationsData.gitlab_oauth);
	const [gitlabSelfHostedOauth, setGitlabSelfHostedOauth] = useState(integrationsData.gitlab_self_hosted_oauth);
	const [bitbucketOauth, setBitbucketOauth] = useState(integrationsData.bitbucket_oauth);
	const [stackoverflowOauth, setStackoverflowOauth] = useState(integrationsData.stackoverflow_oauth);
	
	// Fetch initial data from API
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(`/api/integrations?id=${userID}`); // Replace with your API endpoint
				const data = response.data.integration[0];
				console.log('data:', data);
				setGithubOauth(data.githubOauth || false);
				setGithubPersonalAccessToken(data.githubPersonalAccessToken || '');
				setGitlabOauth(data.gitlabOauth || false);
				setGitlabSelfHostedOauth(data.gitlabSelfHostedOauth || false);
				setBitbucketOauth(data.bitbucketOauth || false);
				setStackoverflowOauth(data.stackoverflowOauth || false);
			} catch (error) {
				console.error('Error fetching integrations:', error);
			}
		}
		
		fetchData();
	}, []);
	
	
	// Handle form submission
	async function handleSubmit(event) {
		event.preventDefault();
		
		const formData = {
			github_oauth: githubOauth,
			github_personal_access_token: githubPersonalAccessToken,
			gitlab_oauth: gitlabOauth,
			gitlab_self_hosted_oauth: gitlabSelfHostedOauth,
			bitbucket_oauth: bitbucketOauth,
			stackoverflow_oauth: stackoverflowOauth
		};
		
		try {
			const response = await axios.patch(`/api/integrations?id=${userID}`, formData);
			
			// Check if the response status is OK (status code 200-299)
			if (response.status >= 200 && response.status < 300) {
				console.log('Integrations saved successfully:', response.data);
			} else {
				console.error('Failed to save integrations:', response.statusText);
			}
		} catch (error) {
			console.error('Error saving integrations:', error);
		}
	}
	
	
	return (
		<>
			<form action="#" method="POST" className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleSubmit}>
				<div className="px-4 py-6 sm:p-6 lg:pb-8">
					<div>
						<h2 className="text-lg   leading-6 text-[#dadee2]">Integrations</h2>
						<p className="mt-1 text-sm text-[#dadee2]">
							Connect your account with third-party services.
						</p>
					</div>
					
					<div className="mt-6 flex flex-col lg:flex-row">
						<div className="flex-grow space-y-6">
							<div>
								<label htmlFor="github_personal_access_token"
											 className="block text-sm   leading-6 font-bold text-[#dadee2]">
									GitHub Personal Access Token
								</label>
								<div className="mt-2">
									<input
										id="github_personal_access_token"
										name="github_personal_access_token"
										type="text"
										value={githubPersonalAccessToken}
										onChange={(e) => setGithubPersonalAccessToken(e.target.value)}
										className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							
							<div>
								<label htmlFor="github_oauth" className="block text-sm   leading-6 font-bold text-[#dadee2]">
									GitHub
								</label>
								<div className="mt-2">
									<Button text={githubOauth ? "Remove Integration" : "Add Integration"}
													handleOnclick={() => setGithubOauth(!githubOauth)}/>
								</div>
							</div>
							
							<div>
								<label htmlFor="gitlab_oauth" className="block text-sm   leading-6 font-bold text-[#dadee2]">
									GitLab
								</label>
								<div className="mt-2">
									<Button text={gitlabOauth ? "Remove Integration" : "Add Integration"}
													handleOnclick={() => setGitlabOauth(!gitlabOauth)}/>
								</div>
							</div>
							
							<div>
								<label htmlFor="gitlab_self_hosted_oauth"
											 className="block text-sm   leading-6 font-bold text-[#dadee2]">
									GitLab Self-Hosted
								</label>
								<div className="mt-2">
									<Button text={gitlabSelfHostedOauth ? "Remove Integration" : "Add Integration"}
													handleOnclick={() => setGitlabSelfHostedOauth(!gitlabSelfHostedOauth)}/>
								</div>
							</div>
							
							<div>
								<label htmlFor="bitbucket_oauth"
											 className="block text-sm   leading-6 font-bold text-[#dadee2]">
									Bitbucket
								</label>
								<div className="mt-2">
									<Button text={bitbucketOauth ? "Remove Integration" : "Add Integration"}
													handleOnclick={() => setBitbucketOauth(!bitbucketOauth)}/>
								</div>
							</div>
							
							<div>
								<label htmlFor="stackoverflow_oauth"
											 className="block text-sm   leading-6 font-bold text-[#dadee2]">
									StackOverflow
								</label>
								<div className="mt-2">
									<Button text={stackoverflowOauth ? "Remove Integration" : "Add Integration"}
													handleOnclick={() => setStackoverflowOauth(!stackoverflowOauth)}/>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-6">
						<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
							Save Integrations
						</button>
					</div>
				</div>
			</form>
		</>
	);
}

export default Integrations;

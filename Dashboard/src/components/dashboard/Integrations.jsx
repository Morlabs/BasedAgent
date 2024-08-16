import React, { useState } from 'react'
import ToggleSwitch from './formUI/ToggleSwitch'
import Button from './formUI/Button'

// CREATE TABLE integrations (
//     id SERIAL PRIMARY KEY,
//     github_oauth BOOLEAN,  -- OAuth Connection: Indicates if GitHub is connected
//     github_personal_access_token VARCHAR(255),  -- Token Input for personal access tokens
//     gitlab_oauth BOOLEAN,  -- OAuth Connection for GitLab
//     gitlab_self_hosted_oauth BOOLEAN,  -- OAuth Connection for GitLab Self-Hosted
//     bitbucket_oauth BOOLEAN,  -- OAuth Connection for Bitbucket
//     stackoverflow_oauth BOOLEAN  -- OAuth Connection for StackOverflow
// );

const integrationsData = {
    github_oauth: false,
    github_personal_access_token: '',
    gitlab_oauth: false,
    gitlab_self_hosted_oauth: false,
    bitbucket_oauth: false,
    stackoverflow_oauth: false,
}

function Integrations() {
    const [githubOauth, setGithubOauth] = useState(integrationsData.github_oauth)
    const [githubPersonalAccessToken, setGithubPersonalAccessToken] = useState(integrationsData.github_personal_access_token)
    const [gitlabOauth, setGitlabOauth] = useState(integrationsData.gitlab_oauth)
    const [gitlabSelfHostedOauth, setGitlabSelfHostedOauth] = useState(integrationsData.gitlab_self_hosted_oauth)
    const [bitbucketOauth, setBitbucketOauth] = useState(integrationsData.bitbucket_oauth)
    const [stackoverflowOauth, setStackoverflowOauth] = useState(integrationsData.stackoverflow_oauth)



    return (
        <>
            <form action="#" method="POST" className="divide-y divide-gray-200 lg:col-span-9">
                <div className="px-4 py-6 sm:p-6 lg:pb-8">
                    <div>
                        <h2 className="text-lg font-medium leading-6 text-[#dadee2]">Integrations</h2>
                        <p className="mt-1 text-sm text-[#dadee2]">
                            Connect your account with third-party services.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                        <div className="flex-grow space-y-6">

                            <div>
                                <label htmlFor="github_personal_access_token" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    GitHub Personal Access Token
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="github_personal_access_token"
                                        name="github_personal_access_token"
                                        type="text"
                                        value={githubPersonalAccessToken}
                                        onChange={(e) => setGithubPersonalAccessToken(e.target.value)}
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                </div>
                            </div>


                            <div>
                                <label htmlFor="github_oauth" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    GitHub
                                </label>
                                <div className="mt-2">
                                    <Button text="Add Integration" handleOnclick={() => setGithubOauth(!githubOauth)} />
                                </div>
                            </div>



                            <div>
                                <label htmlFor="gitlab_oauth" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    GitLab
                                </label>
                                <div className="mt-2">
                                    <Button text="Add Integration" handleOnclick={() => setGitlabOauth(!gitlabOauth)} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="gitlab_self_hosted_oauth" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    GitLab Self-Hosted
                                </label>
                                <div className="mt-2">
                                    <Button text="Add Integration" handleOnclick={() => setGitlabSelfHostedOauth(!gitlabSelfHostedOauth)} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="bitbucket_oauth" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Bitbucket
                                </label>
                                <div className="mt-2">
                                    <Button text="Add Integration" handleOnclick={() => setBitbucketOauth(!bitbucketOauth)} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="stackoverflow_oauth" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    StackOverflow
                                </label>
                                <div className="mt-2">
                                    <Button text="Add Integration" handleOnclick={() => setStackoverflowOauth(!stackoverflowOauth)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Integrations
import React, { useState } from 'react'

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
    const [integrations, setIntegrations] = useState(integrationsData)

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
                                <label htmlFor="github_oauth" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    GitHub
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="github_oauth"
                                        name="github_oauth"
                                        type="checkbox"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="github_personal_access_token" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    GitHub Personal Access Token
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="github_personal_access_token"
                                        name="github_personal_access_token"
                                        type="text"
                                        autoComplete="github_personal_access_token"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="gitlab_oauth" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    GitLab
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="gitlab_oauth"
                                        name="gitlab_oauth"
                                        type="checkbox"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="gitlab_self_hosted_oauth" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    GitLab Self-Hosted
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="gitlab_self_hosted_oauth"
                                        name="gitlab_self_hosted_oauth"
                                        type="checkbox"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="bitbucket_oauth" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Bitbucket
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="bitbucket_oauth"
                                        name="bitbucket_oauth"
                                        type="checkbox"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="stackoverflow_oauth" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    StackOverflow
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="stackoverflow_oauth"
                                        name="stackoverflow_oauth"
                                        type="checkbox"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6" />
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
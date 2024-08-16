import React from 'react'

const JobPreferencesData = {
    desiredPositions: [],
    targetIndustries: [],
    openToRemote: false,
    employmentType: '',
    compensationExpectations: '',
    techStackDislikes: [],
    idealCompanySize: '',
}

function JobPreferences() {
    return (
        <>
            <form action="#" method="POST" className="divide-y divide-gray-200 lg:col-span-9">
                <div className="px-4 py-6 sm:p-6 lg:pb-8">
                    <div>
                        <h2 className="text-lg font-medium leading-6 text-[#dadee2]">Job Preferences</h2>
                        <p className="mt-1 text-sm text-[#dadee2]">
                            Let us know what you're looking for.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                        <div className="flex-grow space-y-6">
                            <div>
                                <label htmlFor="desiredPositions" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Desired Positions
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="desiredPositions"
                                        name="desiredPositions"
                                        type="text"
                                        autoComplete="desiredPositions"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="targetIndustries" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Target Industries
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="targetIndustries"
                                        name="targetIndustries"
                                        type="text"
                                        autoComplete="targetIndustries"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="openToRemote" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Open to Remote
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="openToRemote"
                                        name="openToRemote"
                                        type="checkbox"
                                        autoComplete="openToRemote"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="employmentType" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Employment Type
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="employmentType"
                                        name="employmentType"
                                        type="text"
                                        autoComplete="employmentType"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="compensationExpectations" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Compensation Expectations
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="compensationExpectations"
                                        name="compensationExpectations"
                                        type="text"
                                        autoComplete="compensationExpectations"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow space-y-6 lg:ml-6 lg:space-y-0">
                            <div>
                                <label htmlFor="techStackDislikes" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Tech Stack Dislikes
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="techStackDislikes"
                                        name="techStackDislikes"
                                        type="text"
                                        autoComplete="techStackDislikes"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="idealCompanySize" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Ideal Company Size
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="idealCompanySize"
                                        name="idealCompanySize"
                                        type="text"
                                        autoComplete="idealCompanySize"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default JobPreferences
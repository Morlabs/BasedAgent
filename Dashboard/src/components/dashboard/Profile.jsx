import React from 'react'

const user = {
    name: 'Debbie Lewis',
    handle: 'deblewis',
    email: 'debbielewis@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
}

function Profile() {
    return (
        <>
            <form action="#" method="POST" className="divide-y divide-gray-200 lg:col-span-9">
                {/* Profile section */}
                <div className="px-4 py-6 sm:p-6 lg:pb-8">
                    <div>
                        <h2 className="text-lg font-medium leading-6 text-[#dadee2]">Profile</h2>
                        <p className="mt-1 text-sm text-[#dadee2]">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>



                    <div className="mt-6 flex flex-col lg:flex-row">
                        <div className="flex-grow space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Username
                                </label>
                                <div className="mt-2 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center rounded-l-md border border-gray-300 px-3 text-[#dadee2] sm:text-sm">
                                        workcation.com/
                                    </span>
                                    <input
                                        defaultValue={user.handle}
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        className="bg-[#0b0b0c] block w-full min-w-0 flex-grow rounded-none rounded-r-md border-0 p-1.5 text-[#dadee2]  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="about" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="bg-[#0b0b0c] mt-1 bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-[#dadee2]">
                                    Brief description for your profile. URLs are hyperlinked.
                                </p>
                            </div>
                        </div>


                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                        <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                First name
                            </label>
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                autoComplete="given-name"
                                className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm  placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                Last name
                            </label>
                            <input
                                id="last-name"
                                name="last-name"
                                type="text"
                                autoComplete="family-name"
                                className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm  placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="col-span-12">
                            <label htmlFor="url" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                URL
                            </label>
                            <input
                                id="url"
                                name="url"
                                type="text"
                                className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm  placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="company" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                Company
                            </label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                autoComplete="organization"
                                className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm  placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Profile
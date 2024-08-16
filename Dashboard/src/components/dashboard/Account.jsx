import React, { useState } from 'react'

// CREATE TABLE account (
//     id SERIAL PRIMARY KEY,
//     current_password VARCHAR(255),  -- Password input
//     new_password VARCHAR(255),  -- Password input
//     confirm_password VARCHAR(255),  -- Password input
//     update_settings BOOLEAN,  -- Button action (e.g., true when settings are updated)
//     deactivate_account BOOLEAN  -- Button (Danger Zone): true when account is deactivated
// );

function Account() {
    return (
        <>
            <form action="#" method="POST" className="divide-y divide-gray-200 lg:col-span-9">
                <div className="px-4 py-6 sm:p-6 lg:pb-8">
                    <div>
                        <h2 className="text-lg font-medium leading-6 text-[#dadee2]">Account</h2>
                        <p className="mt-1 text-sm text-[#dadee2]">
                            Manage your account settings.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-5">
                        <div className=" space-y-6">
                            <div className='max-w-[200px]'>
                                <label htmlFor="current_password" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                    Current Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="current_password"
                                        name="current_password"
                                        type="password"
                                        autoComplete="current_password"
                                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className='flex gap-5'>

                                <div>
                                    <label htmlFor="new_password" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                        New Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="new_password"
                                            name="new_password"
                                            type="password"
                                            autoComplete="new_password"
                                            className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 font-bold text-[#dadee2]">
                                        Confirm Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="confirm_password"
                                            name="confirm_password"
                                            type="password"
                                            autoComplete="confirm_password"
                                            className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex-grow lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
                            <button
                                type="submit"
                                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Update Settings
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-6 sm:p-6">
                    <div>
                        <h2 className="text-lg font-medium leading-6 text-[#dadee2]">Danger Zone</h2>
                        <p className="mt-1 text-sm text-[#dadee2]">
                            Deactivate your account.
                        </p>
                    </div>

                    <div className="mt-6 flex-grow lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Deactivate Account
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Account
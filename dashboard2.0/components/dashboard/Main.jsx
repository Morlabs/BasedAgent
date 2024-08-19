import { useState } from 'react'
import {
    BriefcaseIcon,
    CogIcon,
    SquaresPlusIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'

import Header from '../Header'
import JobPreferences from './JobPreferences'
import Integrations from './Integrations'
import Profile from './Profile'
import Account from './Account'

const subNavigation = [
    { name: 'Job Preferences', href: '#', icon: BriefcaseIcon, component: <JobPreferences /> },
    { name: 'Integrations', href: '#', icon: SquaresPlusIcon, component: <Integrations /> },
    { name: 'Profile', href: '#', icon: UserCircleIcon, component: <Profile /> },
    { name: 'Account', href: '#', icon: CogIcon, component: <Account /> },
]

const user = {
    name: 'Debbie Lewis',
    handle: 'deblewis',
    email: 'debbielewis@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [activeTab, setActiveTab] = useState(subNavigation[0])

    return (
        <div>
            <Header />
            <main className="relative mt-10 ">
                <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
                    <div className="overflow-hidden rounded-lg bg-[#161719] shadow border border-solid border-gray-500">
                        <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0 ">
                            <aside className="py-6 px-3 lg:col-span-3 ">

                                <div className="mb-6 flex flex-col-reverse gap-1 justify-center items-center text-center">
                                    <div className="mt-2 lg:hidden">
                                        <div className="flex items-center">
                                            <div
                                                aria-hidden="true"
                                                className="inline-block h-40 w-40 flex-shrink-0 overflow-hidden rounded-full"
                                            >
                                                <img alt="" src={user.imageUrl} className="h-full w-full rounded-full" />
                                            </div>
                                            <div className="relative">
                                                <input
                                                    id="mobile-user-photo"
                                                    name="user-photo"
                                                    type="file"
                                                    className="peer absolute h-full w-full rounded-md opacity-0"
                                                />
                                                <label
                                                    htmlFor="mobile-user-photo"
                                                    className="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-[#dadee2] shadow-sm  peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-[#05dc8d]"
                                                >
                                                    <span>Change</span>
                                                    <span className="sr-only"> user photo</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative hidden overflow-hidden rounded-full lg:block">
                                        <img alt="" src={user.imageUrl} className="relative h-40 w-40 rounded-full" />
                                        <label
                                            htmlFor="desktop-user-photo"
                                            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                                        >
                                            <span>Change</span>
                                            <span className="sr-only"> user photo</span>
                                            <input
                                                id="desktop-user-photo"
                                                name="user-photo"
                                                type="file"
                                                className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                                            />
                                        </label>
                                    </div>
                                    <p>
                                        <span className="block text-lg font-semibold text-[#dadee2]">{user.name}</span>
                                        <span className="block text-sm font-medium text-[#dadee2]">{user.email}</span>
                                    </p>
                                </div>

                                <nav className="space-y-1">
                                    {subNavigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setActiveTab(item)}
                                            aria-current={activeTab.name === item.name ? 'page' : undefined}
                                            className={classNames(
                                                activeTab.name === item.name
                                                    ? 'border-teal-500 bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                                                    : 'border-transparent text-[#dadee2] hover:bg-teal-50 hover:text-teal-700',
                                                'group flex items-center border-l-4 px-3 py-2 text-sm font-medium transition-all font-semibold hover:no-underline',
                                            )}
                                        >
                                            <item.icon
                                                aria-hidden="true"
                                                className={classNames(
                                                    activeTab.name === item.name
                                                        ? 'text-teal-500 group-hover:text-teal-500'
                                                        : 'text-gray-500 group-hover:text-teal-500',
                                                    '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
                                                )}
                                            />
                                            <span className="truncate">{item.name}</span>
                                        </a>
                                    ))}
                                </nav>
                            </aside>

                            <div className="lg:col-span-9 p-6">
                                {activeTab.component}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

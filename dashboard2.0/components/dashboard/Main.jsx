import React, {useEffect, useState} from 'react';
import {
	BriefcaseIcon, CogIcon, SquaresPlusIcon, UserCircleIcon,
} from '@heroicons/react/24/outline';
import {getDeveloper} from '@/actions/developer.api';

import Header from '../Header';
import JobPreferences from './JobPreferences';
import Integrations from './Integrations';
import Profile from './Profile';
import Account from './Account';
import Loader from '@/components/common/Loader';

const subNavigation = [
	{name: 'Profile', href: '#', icon: UserCircleIcon, component: Profile},
	{name: 'Job Preferences', href: '#', icon: BriefcaseIcon, component: JobPreferences},
	{name: 'Integrations', href: '#', icon: SquaresPlusIcon, component: Integrations},
	{name: 'Account', href: '#', icon: CogIcon, component: Account},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Sidebar({id}) {
	const [activeTab, setActiveTab] = useState(subNavigation[0]);
	const [developer, setDeveloper] = useState(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		async function fetchDeveloper() {
			setLoading(true);
			const devData = await getDeveloper(id);
			setDeveloper(devData);
			setLoading(false);
		}
		
		fetchDeveloper();
	}, [id]);
	
	if (loading) {
		return <div className="flex flex-col justify-center items-center h-screen">
			<Loader/>
			<div className="mt-4 text-center">Loading</div>
		</div>
	}
	
	const ActiveComponent = activeTab.component;
	
	return (
		<div>
			<Header/>
			<main className="relative mt-10">
				<div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
					<div className="overflow-hidden rounded-lg bg-[#161719] shadow border border-solid border-gray-500">
						<div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
							<aside className="py-6 px-3 lg:col-span-3">
								<div className="mb-6 flex flex-col-reverse gap-1 justify-center items-center text-center">
									<div className="mt-2 lg:hidden">
										<div className="flex items-center">
											<div
												aria-hidden="true"
												className="inline-block h-40 w-40 flex-shrink-0 overflow-hidden rounded-full"
											>
												<img
													alt=""
													src={developer?.imageUrl || '/default-avatar.png'}
													className="h-full w-full rounded-full"
												/>
											</div>
										</div>
									</div>
									<div className="relative hidden overflow-hidden rounded-full lg:block">
										<img
											alt=""
											src={developer?.imageUrl || '/default-avatar.png'}
											className="relative h-40 w-40 rounded-full"
										/>
									</div>
									<p>
										<span className="block text-lg font-semibold text-[#dadee2]">
											{developer?.name || 'Unknown Developer'}
										</span>
										<span
											className="block text-sm font-medium text-[#dadee2]"
										>
											{developer?.email || 'No email provided'}
										</span>
										<span
											className="block text-sm font-medium text-[#dadee2]"
										>
											{developer?.githubUsername ? (
												<a href={developer.githubUrl} target="_blank" rel="noopener noreferrer">
													@{developer.githubUsername}
												</a>
											) : (
												'No GitHub username'
											)}
										</span>
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
												'group flex items-center border-l-4 px-3 py-2 text-sm font-medium transition-all hover:no-underline',
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
								{ActiveComponent && <ActiveComponent id={id}/>}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

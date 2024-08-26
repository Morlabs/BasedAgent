// app/referrals/page.js
'use client'
import React, {useState} from 'react';
import {Mail, Twitter, Facebook, Linkedin, Copy, RefreshCw, Info} from 'lucide-react';

export default function BasedAgentReferralProgram() {
	const [email, setEmail] = useState('');
	const [filter, setFilter] = useState('');
	const [showTooltip, setShowTooltip] = useState(false);
	const [referrals, setReferrals] = useState([
		{
			id: 1,
			email: 'dev1@example.com',
			status: 'Pending',
			earnings: 0,
			inviteDate: '2024-08-15',
			source: 'Email',
			githubAccess: null
		},
		{
			id: 2,
			email: 'dev2@example.com',
			status: 'Active',
			earnings: 100,
			inviteDate: '2024-08-10',
			source: 'Twitter',
			githubAccess: 'Level 2'
		},
		{
			id: 3,
			email: 'dev3@example.com',
			status: 'Pending',
			earnings: 0,
			inviteDate: '2024-08-18',
			source: 'Email',
			githubAccess: null
		},
		{
			id: 4,
			email: 'dev4@example.com',
			status: 'Active',
			earnings: 75,
			inviteDate: '2024-08-05',
			source: 'Link',
			githubAccess: 'Level 1'
		},
	]);
	
	const totalEarnings = referrals.reduce((sum, referral) => sum + referral.earnings, 0);
	
	const handleResendInvite = (id) => {
		// Logic to resend invite would go here
		console.log(`Resending invite to referral with id ${id}`);
	};
	
	return (
		<div className="bg-gray-900 text-white p-6 font-sans">
			<h1 className="text-3xl font-bold mb-6">DEVELOPER REFERRAL PROGRAM</h1>
			
			<div className="bg-gray-800 rounded-lg p-6 mb-6">
				<h2 className="text-2xl mb-4">Grow the BasedAgent community and earn rewards:</h2>
				<div className="flex flex-wrap gap-2 mb-4">
					<input
						type="email"
						placeholder="Enter developer's email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="flex-grow bg-gray-700 text-white rounded px-4 py-2"
					/>
					<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
						<Mail className="mr-2" size={18}/>
						Invite
					</button>
					<button
						className="bg-transparent border border-blue-400 hover:bg-blue-400 hover:bg-opacity-20 text-blue-400 p-2 rounded">
						<Twitter size={18}/>
					</button>
					<button
						className="bg-transparent border border-blue-600 hover:bg-blue-600 hover:bg-opacity-20 text-blue-600 p-2 rounded">
						<Facebook size={18}/>
					</button>
					<button
						className="bg-transparent border border-blue-500 hover:bg-blue-500 hover:bg-opacity-20 text-blue-500 p-2 rounded">
						<Linkedin size={18}/>
					</button>
					<button
						className="bg-transparent border border-gray-400 hover:bg-gray-400 hover:bg-opacity-20 text-gray-400 px-4 py-2 rounded flex items-center">
						<Copy className="mr-2" size={18}/>
						Copy referral link
					</button>
				</div>
				<p className="text-sm text-gray-400">Earn a 10% recurring commission in BAAG for each developer you successfully
					refer (terms and conditions apply).</p>
			</div>
			
			<div className="bg-gray-800 rounded-lg p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Your Referrals</h2>
					<div className="relative">
						<input
							type="text"
							placeholder="Filter referrals"
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
							className="bg-gray-700 rounded px-4 py-2 pr-10 text-white"
						/>
						<span className="absolute right-3 top-2.5 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
																 fill="currentColor">
                                <path fillRule="evenodd"
																			d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
																			clipRule="evenodd"/>
                            </svg>
                        </span>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
						<tr className="text-left text-gray-400">
							<th className="pb-2">Email</th>
							<th className="pb-2">Status</th>
							<th className="pb-2">Earnings (BAAG)</th>
							<th className="pb-2">Invite Date</th>
							<th className="pb-2">Source</th>
							<th className="pb-2">
								Github Access
								<button
									className="ml-1 text-gray-400 hover:text-gray-300"
									onMouseEnter={() => setShowTooltip(true)}
									onMouseLeave={() => setShowTooltip(false)}
								>
									<Info size={14}/>
								</button>
								{showTooltip && (
									<div className="absolute bg-gray-700 text-white p-2 rounded shadow-lg text-sm z-10 max-w-xs">
										Level 1: Authenticated with Github<br/>
										Level 2: Provided personal access token for advanced data access
									</div>
								)}
							</th>
							<th className="pb-2">Actions</th>
						</tr>
						</thead>
						<tbody>
						{referrals.map(referral => (
							<tr key={referral.id} className="border-t border-gray-700">
								<td className="py-2">{referral.email}</td>
								<td className="py-2">{referral.status}</td>
								<td className="py-2">
									{referral.status === 'Active' ? referral.earnings : '-'}
								</td>
								<td className="py-2">{referral.inviteDate}</td>
								<td className="py-2">{referral.source}</td>
								<td className="py-2">
									{referral.status === 'Active' ? referral.githubAccess : '-'}
								</td>
								<td className="py-2">
									{referral.status === 'Pending' && referral.source === 'Email' && (
										<button
											className="text-blue-400 hover:text-blue-300"
											title="Resend invite"
											onClick={() => handleResendInvite(referral.id)}
										>
											<RefreshCw size={18}/>
										</button>
									)}
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
				<p className="mt-4 text-right font-semibold">Total Earnings: {totalEarnings} BAAG</p>
			</div>
		</div>
	);
}
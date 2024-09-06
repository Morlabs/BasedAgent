'use client';
import React, { useEffect, useState } from 'react';
import { Mail, Twitter, Facebook, Linkedin, Copy, RefreshCw, Info } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import LoaderLocal from "@/components/common/loaderLocal";
import { useRouter } from "next/navigation";
import axios from 'axios'; // Import axios for making the API request
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inviteOptions = [
	{
		label: 'Email',
		value: 'Email',
		icon: <Mail size={18} />
	}
];

export default function BasedAgentReferralProgram() {
	const [email, setEmail] = useState('');
	const [filter, setFilter] = useState('');
	const [showTooltip, setShowTooltip] = useState(false);
	const [loading, setLoading] = useState(true);
	const { isLoggedIn, isLoading, user } = useAuth(); // Use the custom hook
	const router = useRouter();
	const [referrals, setReferrals] = useState([]);
	const [sendingInviteLoading, setSendingInviteLoading] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [severity, setSeverity] = useState('success');



	const shareOnFacebook = () => {
		const facebookReferralLink = `${window?.location?.origin}/referral-signup?referral=${user?.id}&source=Facebook`
		const message = `Join the BasedAgent referral program and earn rewards using the link below: \n${facebookReferralLink}`;
		navigator.clipboard.writeText(message);
		setSnackbarMessage('Referral post message copied to clipboard');
		setSnackbarOpen(true);
		const url = encodeURIComponent(facebookReferralLink);
		// const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
		const facebookShareUrl = `https://www.facebook.com/dialog/share?
  app_id=145634995501895
  &display=popup
  &href=${url}
  &redirect_uri=${url}`;
		window.open(facebookShareUrl, 'facebook-share-dialog', 'width=800,height=600');
	};

	const shareOnTwitter = () => {
		const twitterReferralLink = `${window?.location?.origin}/referral-signup?referral=${user?.id}&source=X\n`
		navigator.clipboard.writeText(twitterReferralLink);

		const url = encodeURIComponent(twitterReferralLink);
		const text = encodeURIComponent("Join the BasedAgent referral program and earn rewards using the link below: \n");
		const hashtags = encodeURIComponent("morlabs,basedagent,referralprogram");
		const twitterShareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`;
		window.open(twitterShareUrl, 'twitter-share-dialog', 'width=800,height=600');
	};

	const shareOnLinkedIn = () => {
		const linkedInReferralLink = `${window?.location?.origin}/referral-signup?referral=${user?.id}&source=LinkedIn`
		const message = `Join the BasedAgent referral program and earn rewards using the link below: \n${linkedInReferralLink}`;
		navigator.clipboard.writeText(message);
		setSnackbarMessage('Referral post message copied to clipboard');
		setSnackbarOpen(true);
		const url = encodeURIComponent(linkedInReferralLink);
		// const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&title=${title}&summary=${summary}`;
		const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
		window.open(linkedInShareUrl, 'linkedin-share-dialog', 'width=800,height=600');
	};

	const copyReferralLink = () => {
		const developerId = user.id;
		const getBaseUrl = window.location.origin;
		const referralLink = `${getBaseUrl}/referral-signup?referral=${developerId}`;
		navigator.clipboard.writeText(referralLink);
		setSnackbarOpen(true);
		setSnackbarMessage('Referral link copied to clipboard');
	};

	// Calculate total earnings
	const totalEarnings = referrals.reduce((sum, referral) => sum + referral.earnings, 0);

	// Function to handle resending the invite
	const handleResendInvite = (id) => {
		// Logic to resend invite would go here
		console.log(`Resending invite to referral with id ${id}`);
	};

	// Effect to check if the user is logged in, if not redirect to homepage
	useEffect(() => {
		if (!isLoading && !isLoggedIn) {
			router.push('/'); // Redirect to homepage if not logged in
		}
	}, [isLoggedIn, isLoading, router]);

	// Effect to fetch referrals data when the component renders
	useEffect(() => {
		if (user) {
			setLoading(true);
			axios.post('/api/referrals', { developerID: user.id })
				.then(response => {
					setReferrals(response.data.developerInvite);
				})
				.catch(error => {
					console.error("Error fetching referrals:", error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [user]);

	if (loading || isLoading) {
		return (
			<div className="flex flex-col justify-center items-center h-screen">
				<LoaderLocal />
				<div className="mt-4 text-center">Loading</div>
			</div>
		);
	}

	const sendReferralInvite = async (source) => {
		try {
			setSendingInviteLoading(true);

			if (!email) {
				setSeverity('error');
				setSnackbarOpen(true);
				setSnackbarMessage('Please enter the email address');
				setSendingInviteLoading(false);
				return;
			}

			// if (email === user.email) {
			// 	setSeverity('error');
			// 	setSnackbarOpen(true);
			// 	setSnackbarMessage('You cannot refer yourself');
			// 	setSendingInviteLoading(false);
			// 	return;
			// }
			// const response = await axios.post('/api/referral-invite', {
			// 	developerId: user.id,
			// 	inviteeEmail: email,
			// 	source: source
			// });
			const response = await axios.post('/api/referral-invite', {
				developerId: user.id,
				inviteeEmail: email,
				source: source,
				totalWeight: user.weight.totalWeight,
				userName: user.name,
				userEmail: user.email,
			});

			console.log('Referral invite sent:', response.data);
			setSeverity('success');
			setSnackbarOpen(true);
			if (response.data.message) {
				setSeverity('error');
				setSnackbarMessage(response.data.message);
			} else {
				setSnackbarMessage('Referral invite sent successfully');
			}
			setEmail('');
		} catch (error) {
			console.error('Error sending referral invite:', error);
			setSeverity('error');
			setSnackbarOpen(true);
			setSnackbarMessage('Error sending referral invite');
		}
		finally {
			setSendingInviteLoading(false);
		}
	};

	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className="bg-gray-900 text-white p-6 font-sans w-full lg:w-[70%]">
			<div className='mb-5'>
				<Header />
			</div>
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
					<button
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
						onClick={() => sendReferralInvite('Email')} // Link the button to sendReferralInvite function
					>
						<Mail className="mr-2" size={18} />
						{sendingInviteLoading ? 'Sending...' : 'Invite'}
					</button>
					<button
						onClick={shareOnTwitter}
						className="bg-transparent border border-blue-400 hover:bg-blue-400 hover:bg-opacity-20 text-blue-400 p-2 rounded">
						<Twitter size={18} />
					</button>
					<button
						onClick={shareOnFacebook}
						className="bg-transparent border border-blue-600 hover:bg-blue-600 hover:bg-opacity-20 text-blue-600 p-2 rounded">
						<Facebook size={18} />
					</button>
					<button
						onClick={shareOnLinkedIn}
						className="bg-transparent border border-blue-500 hover:bg-blue-500 hover:bg-opacity-20 text-blue-500 p-2 rounded">
						<Linkedin size={18} />
					</button>
					<button
						onClick={copyReferralLink}
						className="bg-transparent border border-gray-400 hover:bg-gray-400 hover:bg-opacity-20 text-gray-400 px-4 py-2 rounded flex items-center">
						<Copy className="mr-2" size={18} />
						Copy referral link
					</button>
				</div>
				<p className="text-sm text-gray-400">
					Earn a 10% recurring commission in BAAG for each developer you successfully refer (terms and conditions apply).
				</p>
			</div>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={() => setSnackbarOpen(false)}
				message={snackbarMessage}
			>
				<Alert onClose={() => setSnackbarOpen(false)}
					severity={severity}
					sx={{ width: '100%' }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>

			<div className="bg-gray-800 rounded-lg p-6">
				<div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-4">
					<div className='flex items-center'>
						<h2 className="text-xl font-semibold m-0">Your Referrals</h2>
					</div>
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
									clipRule="evenodd"
								/>
							</svg>
						</span>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full table-auto">
						<thead>
							<tr className="text-left text-gray-400">
								<th className="pb-2 px-4">Email</th>
								<th className="pb-2 px-4">Status</th>
								<th className="pb-2 px-4">Referral Weights</th>
								<th className="pb-2 px-4">Invite Date</th>
								<th className="pb-2 px-4">Source</th>
								<th className="pb-2 px-4 whitespace-nowrap">
									Github Access
									<button
										className="ml-1 text-gray-400 hover:text-gray-300"
										onMouseEnter={() => setShowTooltip(true)}
										onMouseLeave={() => setShowTooltip(false)}
									>
										<Info size={14} />
									</button>
									{showTooltip && (
										<div className="absolute bg-gray-700 text-white p-2 rounded shadow-lg text-sm z-10 max-w-xs">
											Level 1: Authenticated with Github<br />
											Level 2: Provided personal access token for advanced data access
										</div>
									)}
								</th>
								<th className="pb-2 px-4">Actions</th>
							</tr>
						</thead>
						<tbody>
							{referrals.length > 0 ? referrals.map(referral => (
								<tr key={referral.id} className="border-t border-gray-700">
									<td className="py-2 px-4 whitespace-nowrap">{referral.email}</td>
									<td className="py-2 px-4 capitalize">{referral.status}</td>
									<td className="py-2 px-4">
										{referral.status === 'Active' || referral.status === 'active' ? referral.earnings : '-'}
									</td>
									<td className="py-2 px-4">{formatDate(referral.inviteDate)}</td>
									<td className="py-2 px-4">{referral.source}</td>
									<td className="py-2 px-4">{referral.githubAccess ? referral.githubAccess : 'N/A'}</td>
									<td className="py-2 px-4">
										{(referral.status !== 'Active' && referral.status !== 'active') && (
											<button
												onClick={() => handleResendInvite(referral.id)}
												className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center">
												<RefreshCw size={16} />
												<span className="ml-1">Resend Invite</span>
											</button>
										)}
									</td>
								</tr>
							)) : (
								<tr>
									<td colSpan="7" className="py-4 text-center text-gray-400">No referrals found.</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

			</div>
			{/* total earning */}
			<div className="mt-10 text-center md:text-right">
				<h3 className="text-xl font-semibold">Total Earnings: {totalEarnings} BAAG</h3>
			</div>
			<Footer />
		</div>
	);
}

'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, {useState, useEffect, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import {signOut} from "next-auth/react";
import axios from 'axios';
import {useAuth} from "@/hooks/useAuth";
import LoaderLocal from "@/components/common/loaderLocal";

const ReviewerSignup = () => {
	const [formData, setFormData] = useState({
		name: '',
		availability: '',
		skills: '',
		discordHandle: '',
		github_username: '',
		github_url: '',
		top_languages: '',
		total_contributions: 0,
		public_repositories: 0,
		email: ''
	});
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const {isLoggedIn, user, isLoading} = useAuth(); // Use useAuth hook
	
	useEffect(() => {
		if (isLoggedIn && user) {
			const {name, email, githubDetails} = user || {};
			setFormData((prevData) => ({
				...prevData,
				name: name || '',
				email: email || '',
				github_username: githubDetails?.login || '',
				github_url: githubDetails?.html_url || '',
				top_languages: githubDetails?.top_languages || [],
				skills: githubDetails?.top_languages || [],
				total_contributions: githubDetails?.total_contribution || 0,
			}));
		}
	}, [isLoggedIn, user]);
	
	const handleChange = useCallback((e) => {
		const {name, value} = e.target;
		setFormData((prevData) => ({...prevData, [name]: value}));
	}, []);
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const reviewerSignup = await axios.post('/api/reviewer-signup', formData);
			console.log('reviewerSignup:', reviewerSignup);
			setSubmitted(true);
		} catch (error) {
			console.error("Form submission error", error);
		} finally {
			setLoading(false);
		}
	};
	
	if (submitted) {
		return (
			<div>
				<Header/>
				<div className="container"
						 style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
					<h2>Thank you for applying!</h2>
					<p>Thanks for applying to become a Code Reviewer at BasedAgent. A member of our team will be in touch to
						review your application and reach out to you if there is a fit.</p>
					<button type="button" onClick={() => window.open('https://discord.gg/m2Qud5GDqp', '_blank')}>
						Join Our Discord
					</button>
					<button
						className="mt-4 px-4 py-2 bg-[#64D894] text-white rounded hover:bg-[#56c384]"
						onClick={() => router.push('/dashboard')}
					>
						Go to Dashboard
					</button>
				</div>
				<Footer/>
			</div>
		);
	}
	
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<LoaderLocal/>
			</div>
		); // Show a loader while checking the session
	}
	
	if (!isLoggedIn) {
		return (
			<div>
				<Header/>
				<div className="container text-center py-8 text-white">
					<h2>Please log in to complete your profile</h2>
					<button
						className="mt-4 px-4 py-2 bg-[#64D894] text-white rounded hover:bg-[#56c384]"
						onClick={() => router.push('/')} // Replace with your navigation logic
					>
						Go to Home
					</button>
				</div>
				<Footer/>
			</div>
		);
	}
	
	return (
		<div>
			<Header/>
			<div className="container">
				<h1>Complete Your Reviewer Profile</h1>
				<form onSubmit={handleSubmit} className="reviewer-form">
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="availability"
						placeholder="Availability (hours per week)"
						value={formData.availability}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="discordHandle"
						placeholder="Discord Handle"
						value={formData.discordHandle}
						onChange={handleChange}
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					{/* Hidden fields */}
					<input type="hidden" name="github_username" value={formData.github_username}/>
					<input type="hidden" name="github_url" value={formData.github_url}/>
					<input type="hidden" name="top_languages" value={formData.top_languages}/>
					<input type="hidden" name="total_contributions" value={formData.total_contributions}/>
					<input type="hidden" name="public_repositories" value={formData.public_repositories}/>
					
					<button type="submit" disabled={loading}>
						{loading ? 'Submitting...' : 'Submit Application'}
					</button>
					{isLoggedIn && (
						<button
							type="button"
							className="bg-red-600 py-2 px-6 rounded-md"
							onClick={() => signOut()}
						>
							Sign out
						</button>
					)}
				</form>
			</div>
			<Footer/>
		</div>
	);
};

export default ReviewerSignup;

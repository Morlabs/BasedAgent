'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

const ReviewerSignup = () => {
	const [formData, setFormData] = useState({
		name: '',
		availability: '',
		discordHandle: '',
		github_username: '',
		github_url: '',
		top_languages: '',
		total_contributions: 0,
		public_repositories: 0,
		email: ''
	});
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	
	useEffect(() => {
		console.log("useEffect triggered");
		const params = new URLSearchParams(window.location.search);
		const githubData = Object.fromEntries(params.entries());
		
		console.log("params:", params);
		console.log("GitHub data from URL:", githubData);
		
		if (githubData.github_username) {
			setFormData(prevData => ({
				...prevData,
				...githubData,
				name: githubData.name || '',
				total_contributions: Number(githubData.total_contributions),
				public_repositories: Number(githubData.public_repositories)
			}));
			console.log("Updated formData:", formData);
			setLoading(false);
		} else {
			console.log("GitHub username not found, redirecting...");
			router.push('/reviewer-signup');
		}
	}, [router]);
	
	const handleChange = (e) => {
		console.log(`Changing ${e.target.name} to ${e.target.value}`);
		setFormData({...formData, [e.target.name]: e.target.value});
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form submitted with data:", formData);
		try {
			const response = await fetch('/api/reviewer-signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(formData)
			});
			console.log("Response status:", response.status);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();
			console.log("Server response:", result);
			setSubmitted(true);
		} catch (error) {
			console.error('Error:', error);
		}
	};
	
	if (loading) {
		console.log("Loading state...");
		return <div>Loading...</div>;
	}
	
	if (submitted) {
		console.log("Form successfully submitted, showing thank you message.");
		return (
			<div>
				<Header/>
				<div className="container">
					<h2>Thank you for applying!</h2>
					<p>Thanks for applying to become a Code Reviewer at BasedAgent. A member of our team will be in touch to
						review your application and reach out to you if there is a fit.</p>
					<button type="button" onClick={() => window.open('https://discord.gg/m2Qud5GDqp', '_blank')}>Join Our
						Discord
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
					
					<button type="submit">Submit Application</button>
				</form>
			</div>
			<Footer/>
		</div>
	);
};

export default ReviewerSignup;

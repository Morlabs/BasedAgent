'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const ReviewerSignupStart = () => {
	const handleGitHubLogin = () => {
		const rawRedirectUri = `http://localhost:3000/reviewer-signup/complete`;
		const redirectUri = encodeURIComponent(rawRedirectUri);
		
		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=Ov23liMjT0z7a2gxWqKY&redirect_uri=${redirectUri}&scope=user`;
		
		console.log('GitHub Client ID:', process.env.REACT_APP_GITHUB_CLIENT_ID);
		console.log('Server Port:', process.env.REACT_APP_SERVER_PORT);
		console.log('Raw Redirect URI:', rawRedirectUri);
		console.log('Encoded Redirect URI:', redirectUri);
		console.log('GitHub Auth URL:', githubAuthUrl);
		
		window.location.href = githubAuthUrl;
	};
	
	return (
		<div>
			<Header/>
			<div className="container">
				<h1>Become a Reviewer</h1>
				<p>To get started, please authenticate with GitHub. This will help us pre-fill some of your information.</p>
				<button onClick={handleGitHubLogin} className="github-auth-button">
					<img src="/github.png" alt="GitHub Logo" className="github-logo"/>
					Sign up with GitHub
				</button>
			</div>
			<Footer/>
		</div>
	);
};

export default ReviewerSignupStart;

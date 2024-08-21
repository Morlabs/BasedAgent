'use client';
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import Loader from '@/components/common/loader';
import { useAuth } from "@/hooks/useAuth";
import { signIn } from "next-auth/react";

const ReviewerSignupStart = () => {
	const router = useRouter();
	const { isLoggedIn, isLoading, user } = useAuth(); // Use useAuth hook
	
	const handleSignIn = async () => {
		await signIn('github', { callbackUrl: `/user` }); // Redirect to a temporary route
	}
	
	// Effect to handle redirection if the user is already logged in
	useEffect(() => {
		if (isLoggedIn && user?.id) {
			router.push(`/user/${user.id}`);
		}
	}, [isLoggedIn, user, router]);
	
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader />
			</div>
		); // Show a loader while checking the session
	}
	
	if (!isLoggedIn) {
		return (
			<div>
				<Header />
				<div className="container mx-auto p-4">
					<h1 className="text-2xl font-bold mb-4">Become a Reviewer</h1>
					<p className="mb-6">
						To get started, please authenticate with GitHub. This will help us pre-fill some of your information.
					</p>
					<button
						onClick={handleSignIn}
						className={`flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
						disabled={isLoading}
					>
						<img src="/github.png" alt="GitHub Logo" className="w-5 h-5 mr-2" />
						Sign up with GitHub {isLoading && <Loader />}
					</button>
				</div>
				<Footer />
			</div>
		);
	}
	
	return null; // Prevents rendering when the session is available and navigation is handled.
}

export default ReviewerSignupStart;

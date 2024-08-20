'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {useSession, signIn, signOut} from "next-auth/react"
import Image from 'next/image'
import {useRouter} from 'next/navigation'

const ReviewerSignupStart = () => {
	const router = useRouter()
	
	const {data: session} = useSession()
	console.log('session:', session)
	
	if (session) {
		router.push('/reviewer-signup/complete')
	}
	
	if (!session) {
		
		return (
			<div>
				<Header/>
				<div className="container">
					<h1>Become a Reviewer</h1>
					<p>To get started, please authenticate with GitHub. This will help us pre-fill some of your information.</p>
					<button onClick={() => signIn('github')} className="github-auth-button">
						<img src="/github.png" alt="GitHub Logo" className="github-logo"/>
						Sign up with GitHub
					</button>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default ReviewerSignupStart;

'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {useSession, signIn, signOut} from "next-auth/react"
import Image from 'next/image'

const ReviewerSignupStart = () => {
	
	const {data: session} = useSession()
	console.log('session:', session)
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
	} else
		return (
			<div className="w-full h-screen flex flex-col justify-center items-center">
				<div className="w-44 h-44 relative mb-4">
					<Image
						src={session.user?.image}
						fill
						alt=""
						className="object-cover rounded-full"
					/>
				</div>
				<p className="text-2xl mb-2">Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As</p>
				<p className="font-bold mb-4">{session.user?.email}</p>
				<button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</button>
			</div>
		)
}

export default ReviewerSignupStart;

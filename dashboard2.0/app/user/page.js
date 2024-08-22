'use client'
import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from "@/hooks/useAuth";
import Loader from "@/components/common/loader";
import {addDeveloper} from "@/actions/developer.api"; // Assuming this is the API you want to call

const TempRedirect = () => {
	const router = useRouter();
	const {isLoggedIn, user, isLoading} = useAuth();
	
	useEffect(() => {
		const handleRedirect = async () => {
			if (isLoggedIn && user?.id) {
				// Example API call
				try {
					const response = await addDeveloper(user); // Call your API here
					console.log('API response:', response); // Handle the response
				} catch (error) {
					console.error('API error:', error); // Handle any errors
				}
				
				router.push(`/user/${user.id}`);
			} else if (!isLoading && !isLoggedIn) {
				router.push('/');
			}
		};
		
		handleRedirect(); // Call the async function inside useEffect
	}, [isLoggedIn, user, isLoading, router]);
	
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<Loader/>
			<div className="mt-4 text-center">Authenticating</div>
		</div>
	);
};

export default TempRedirect;

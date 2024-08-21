import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from "@/hooks/useAuth";
//TODO : need to add api here to populate the data
const TempRedirect = () => {
	const router = useRouter();
	const { isLoggedIn, user, isLoading } = useAuth(); // Use useAuth hook
	
	useEffect(() => {
		if (isLoggedIn && user?.id) {
			// Redirect to the user's specific page once the session is established
			router.push(`/user/${user.id}`);
		} else if (!isLoading && !isLoggedIn) {
			// Handle cases where the session isn't available or the user isn't authenticated
			router.push('/'); // Redirect to the home page or a login page
		}
	}, [isLoggedIn, user, isLoading, router]);
	
	return <div>Loading...</div>; // Show a loading state until the redirection happens
};

export default TempRedirect;

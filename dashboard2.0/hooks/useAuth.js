import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const useAuth = () => {
	const { data: session, status } = useSession();
	const [authState, setAuthState] = useState({
		isLoggedIn: false,
		isLoading: true,
		user: null,
	});
	
	useEffect(() => {
		if (status === 'loading') {
			setAuthState({
				isLoggedIn: false,
				isLoading: true,
				user: null,
			});
		} else if (status === 'authenticated') {
			setAuthState({
				isLoggedIn: true,
				isLoading: false,
				user: session.user,
			});
		} else if (status === 'unauthenticated') {
			setAuthState({
				isLoggedIn: false,
				isLoading: false,
				user: null,
			});
		}
	}, [status, session]);
	
	return authState;
};

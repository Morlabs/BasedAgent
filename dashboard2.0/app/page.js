'use client'

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation'

function Home() {
	const router = useRouter();
	
	useEffect(() => {
		const script = document.createElement('script');
		script.src = '../script.js';
		script.async = true;
		document.body.appendChild(script);
		
		return () => {
			document.body.removeChild(script);
			router.push('/leaderboard');
		};
	}, []);

	return (
		<div>
		</div>
	);

}

export default Home;

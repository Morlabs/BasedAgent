'use client'

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation'
import LoaderLocal from '@/components/common/loaderLocal';

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
		<div className='h-[90vh] flex items-center justify-start'>
			<LoaderLocal/>
		</div>
	);

}

export default Home;

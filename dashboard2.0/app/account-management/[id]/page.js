'use client'
import React from 'react'
import Main from '@/components/dashboard/Main'
import {useParams} from "next/navigation";

function Dashboard() {
	const {id} = useParams();

	return (
		<Main id={id}/>
	)
}

export default Dashboard
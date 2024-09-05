'use client';

import React from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'

const Home = () => {

  const router = useRouter();

  const handleNavigateToSignup = () => {
    console.log('button clicked')
    router.push('/reviewer-signup');
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src="/Based_Agent_logo.png" alt="Based Agent Logo" className="mb-4" />
        <h1 className="text-4xl font-bold mb-4">AI Coding Assistant</h1>
        <p className="text-center max-w-lg mb-4">
          Built by <a href="https://morlabs.xyz/" className="text-blue-500">Mor Labs</a>, Based Agent is an innovative AI coding assistant that
          autonomously submits high-quality code contributions to web3 projects around the clock, with <a
            href="https://mor.org/" className="text-blue-500">Morpheus</a> as its initial focus. This tireless AI works 24/7, generating valuable
          updates and improvements for which it receives compensation from the projects it assists. Based Agent&apos;s
          capabilities are continually refined through human-in-the-loop reinforcement learning, where expert code
          reviewers play a crucial role. These reviewers not only help enhance Based Agent&apos;s productivity and code
          quality over time but also receive rewards proportional to their contributions to the system.
        </p>

        <div className="reviewer-form">
          <button type="button" onClick={handleNavigateToSignup} className="bg-blue-500 text-white py-2 px-4 rounded">
            Apply to be a Based Reviewer
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '../script.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleNavigateToSignup = () => {
    navigate('/reviewer-signup');
  };

  return (
    <div>
      <Header />
      <div className="container">
        <img src="/Based_Agent_logo.png" alt="Based Agent Logo" />
        <h1>AI Coding Assistant</h1>
        <p>
          Built by <a href="https://morlabs.xyz/">Mor Labs</a>, Based Agent is an innovative AI coding assistant that autonomously submits high-quality code contributions to web3 projects around the clock, with <a href="https://mor.org/">Morpheus</a> as its initial focus. This tireless AI works 24/7, generating valuable updates and improvements for which it receives compensation from the projects it assists. Based Agent's capabilities are continually refined through human-in-the-loop reinforcement learning, where expert code reviewers play a crucial role. These reviewers not only help enhance Based Agent's productivity and code quality over time but also receive rewards proportional to their contributions to the system.
        </p>

        <div className="reviewer-form">
          <button type="button" onClick={handleNavigateToSignup}>Apply to be a Based Reviewer</button>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Home;

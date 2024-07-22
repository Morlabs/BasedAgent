import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles.css';

const ReviewerSignupStart = () => {
  const handleGitHubLogin = () => {
    // Use the SERVER_PORT for the redirect URI
    const rawRedirectUri = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/reviewer-signup/complete`;
    const redirectUri = encodeURIComponent(rawRedirectUri);

    // Prepare the URL for GitHub authentication
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=user`;

    // Debugging logs to help trace the URL construction
    console.log('Raw Redirect URI:', rawRedirectUri);
    console.log('Encoded Redirect URI:', redirectUri);
    console.log('GitHub Auth URL:', githubAuthUrl);

    // Redirect the user to GitHub's OAuth page
    window.location.href = githubAuthUrl;
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Become a Reviewer</h1>
        <p>To get started, please authenticate with GitHub. This will help us pre-fill some of your information.</p>
        <button onClick={handleGitHubLogin} className="github-auth-button">
          <img src="/github.png" alt="GitHub Logo" className="github-logo" />
          Sign up with GitHub
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewerSignupStart;

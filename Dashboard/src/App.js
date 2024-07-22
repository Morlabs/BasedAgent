import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import FAQs from './pages/FAQs';
import BAAGToken from './pages/BAAGToken';
import ReviewerSignupStart from './pages/ReviewerSignupStart';
import ReviewerSignup from './pages/ReviewerSignup';
import './styles.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/baag-token" element={<BAAGToken />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/reviewer-signup" element={<ReviewerSignupStart />} />
          <Route path="/reviewer-signup/complete" element={<ReviewerSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
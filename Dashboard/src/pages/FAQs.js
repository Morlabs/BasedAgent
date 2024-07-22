import React from 'react';
import '../styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FAQs() {
  return (
    <div>
      <Header />
      <div className="content faq-content">
        <h1>Based Agent Project FAQ</h1>
        <div className="faq-section">
          <div className="faq-item">
            <h2>Q: What is Based Agent?</h2>
            <p>A: Based Agent is an AI coding assistant designed to enhance development within the Morpheus ecosystem and decentralized AI development.</p>
          </div>
          <div className="faq-item">
            <h2>Q: What features will Based Agent offer?</h2>
            <p>A: Based Agent will provide advanced coding assistance, including intelligent code suggestions, bug detection, and optimization tips, as well as seamless integration with the Morpheus ecosystem.</p>
          </div>
          <div className="faq-item">
            <h2>Q: Who is building Based Agent?</h2>
            <p>A: Based Agents is built by the Mor Labs team, a team that emerged from the Morpheus Ecosystem and operates as a Morpheas protocol focused venture studio.</p>
          </div>
          <div className="faq-item">
            <h2>Q: What is the tokenomics structure of Based Agent?</h2>
            <p>A: Based Agent will feature a multi-pool system with a fixed supply of Based Agent Tokens (BaaG) emitted over 16 years, allocated across coding, community, capital, and security pools.</p>
          </div>
          <div className="faq-item">
            <h2>Q: How will the fair launch strategy work?</h2>
            <p>A: Based Agent will follow the MOR20 fair launch model, ensuring a decentralized and community-driven approach to funding and development.</p>
          </div>
          <div className="faq-item">
            <h2>Q: What is the current status of the project?</h2>
            <p>A: The initial development of the token contract and associated Morpheus smart contracts is complete, with external expertise sought for review and deployment.</p>
          </div>
          <div className="faq-item">
            <h2>Q: Are there any bounty programs available?</h2>
            <p>A: Yes, a bounty program is offered for fixing errors in the Distribution.sol contract and deploying token contracts on Arbitrum One, with rewards in MOR and BaaG.</p>
          </div>
          <div className="faq-item">
            <h2>Q: How can I participate in the project or get more information?</h2>
            <p>A: Join us on Discord and participate in open bounties.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FAQs;

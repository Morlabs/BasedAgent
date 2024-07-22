import React from 'react';
import '../styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
  return (
    <div>
      <Header />
      <div className="content">
        <h1>About Based Agent</h1>
        <p>
          Built by <a href="https://morlabs.xyz/">Mor Labs</a>, Based Agent is an accelerationist AI coding assistant that revolutionizes the way developers build within the Morpheus ecosystem. Inspired by the innovative approach of Cognition AI's Devin, our vision is to create a collaborative and decentralized AI-driven coding environment where developers, capital providers, and the community come together to accelerate the speed of development within the Morpheus Ecosystem.
        </p>
        <p>
          With features such as advanced coding assistance, bug detection, and optimization tips, Based Agent streamlines the development process, empowering builders to focus on creating innovative applications. Based Agent combined with the strengths of the Morpheus ecosystem, create a powerful tool for building decentralized AI.
        </p>
        <p>
          Following the principles of the MOR20 fair launch model, we ensure a transparent and community-driven approach to funding and development. This approach allows for equitable participation and rewards for all contributors, creating a sustainable and decentralized ecosystem.
        </p>
        <p>
          Join us in shaping the future of decentralized AI with Based Agent. Learn more about the project, participate in the community through our <a href="https://discord.gg/KBD3XBmNUf">Discord</a>, help us build, and together, let's create a decentralized future that benefits everyone.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default About;

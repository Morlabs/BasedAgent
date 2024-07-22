import React from 'react';
import '../styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function BAAGToken() {
  return (
    <div>
      <Header />
      <div className="content">
        <h1>BAAG Token</h1>
        <section className="tokenomics-section">
          <div className="column">
            <h2>BAAG Tokenomics</h2>
            <p>42 Million total supply</p>
          </div>
          <div className="column">
            <p>The BAAG supply is limited to a maximum of 42,000,000 tokens that will ever exist.</p>
          </div>
        </section>
        <section className="utility-section">
          <div className="column">
            <h2>BAAG Utility</h2>
            <p>BAAG token governs, prioritizes reviews, assures quality, transacts.</p>
          </div>
          <div className="column">
          <p>The BAAG token primarily serves as the governance token for Based Agent, playing a crucial role in steering the platform's development and operational strategies.</p>
            <p>Starting from the Ubud phase, users will have the opportunity to stake BAAG tokens to gain priority access to code reviews. The amount of BAAG staked directly correlates with the speed and priority of the review process, ensuring faster feedback and integration for developers who are committed to rapid development cycles.</p>
            <p>BAAG tokens also function as a form of collateral that reviewers can post as a guarantee of the quality and integrity of their reviews. This collateral is at risk of being slashed if a review is subsequently found to be incorrect or introduces a critical error, thereby enforcing high standards and accountability within the review process.</p>
            <p>BAAG is the designated currency for all settlements between parties that directly contribute to the Based Agent ecosystem, facilitating a streamlined and unified transaction process.</p>
          </div>
        </section>
        <section className="distribution-section">
          <div className="column">
            <h2>BAAG Distribution</h2>
            <p>BAAG is distributed to four contributor groups</p>
          </div>
          <div className="column">
            <p>The distribution will start with four Morpheus contributor groups earning the tokens by providing forms of proof of work (labor) and proof of stake (capital) to the network:</p>
            <ul>
              <li>→ 25% to Reviewers</li>
              <li>→ 25% to Builders</li>
              <li>→ 30% to Capital</li>
              <li>→ 16% to Community</li>
              <li>→ 4% to Protection</li>
            </ul>
            <div className="distribution-graphic">
              <img src="/baag_distribution_chart.png" alt="BAAG Distribution Graphic" />
            </div>
          </div>
        </section>
        <section className="emission-schedule-section">
          <div className="column">
            <h2>BAAG Emission Schedule</h2>
            <p>Full emission of BAAG supply at decreasing rate over ~16 years</p>
          </div>
          <div className="column">
            <p>The block reward will start at 14,400 BAAG per day and then decline by 2.468994701 BAAG each day until the reward reaches 0 on day 5,833.</p>
            <div className="emission-chart">
              <img src="/baag_emission_schedule_white.png" alt="BAAG Emission Schedule Chart" />
            </div>
          </div>
        </section>
        <section className="cumulative-emissions-section">
          <div className="column">
            <h2>Cumulative BAAG Emissions</h2>
          </div>
          <div className="column">
            <div className="emission-chart">
              <img src="/baag_cumulative_emissions_white.png" alt="Cumulative BAAG Emissions Chart" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default BAAGToken;

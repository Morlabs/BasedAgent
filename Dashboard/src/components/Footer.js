import React from 'react';
import '../styles.css';

function Footer() {
  return (
    <div className="footer">
      <div className="morpheus-image-footer">
        <img src="/morpheus_ecosystem.png" alt="Morpheus Ecosystem" />
      </div>
      <div className="footer-right">
        <a href="https://x.com/Based_Agent_AI" target="_blank" rel="noopener noreferrer">
          <img src="/x_logo_small.png" alt="X Logo" />
        </a>
        <a href="https://discord.gg/KBD3XBmNUf" target="_blank" rel="noopener noreferrer">
          <img src="/discord.png" alt="Discord Logo" />
        </a>
        <a href="https://github.com/Morlabs/BasedAgent/" target="_blank" rel="noopener noreferrer">
          <img src="/github.png" alt="Github Logo" />
        </a>
      </div>
    </div>
  );
}

export default Footer;

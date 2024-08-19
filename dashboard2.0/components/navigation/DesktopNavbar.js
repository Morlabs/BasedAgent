import React from 'react';
import Link from 'next/link'
import Logo from '../branding/Logo';

function DesktopNavbar({toggleMenu, menuActive}) {
	return (
		<div className="navbar">
			<div className="navbar-logo">
				<Logo/>
			</div>
			<div className="navbar-desktop">
				<div className="dropdown">
					<Link href="#">About Based Agent</Link>
					<div className="dropdown-content">
						<Link href="/about">About</Link>
						<Link href="/baag-token">BAAG Token</Link>
						<a
							href="https://github.com/Morlabs/BasedAgent1/blob/main/README.md#based-agent-protection-fund"
							target="_blank"
							rel="noopener noreferrer"
						>
							Protection Fund
						</a>
						<a
							href="https://mor.org/MOR20"
							target="_blank"
							rel="noopener noreferrer"
						>
							MOR20 Platform
						</a>
					</div>
				</div>
				<a target='_blank' rel='noopener noreferrer'
					 href="https://github.com/Morlabs/BasedAgent/blob/main/Contribute/contribution_guidelines.md">Contribute</a>
				<div className="dropdown">
					<Link href="#">Resources</Link>
					<div className="dropdown-content">
						<a href="https://github.com/Morlabs/BasedAgent1/blob/main/README.md" target="_blank"
							 rel="noopener noreferrer">Docs</a>
						<Link href="/faqs">FAQs</Link>
					</div>
				</div>
			</div>
			<div className="navbar-mobile">
				<span className="hamburger" onClick={toggleMenu}>MENU</span>
				<div className={`navbar-menu ${menuActive ? 'active' : ''}`}>
					<div className="dropdown">
						<Link href="#" onClick={toggleMenu}>About Based Agent</Link>
						<div className="dropdown-content">
							<Link href="/about" onClick={toggleMenu}>About</Link>
							<Link href="/baag-token" onClick={toggleMenu}>BAAG Token</Link>
							<Link href="/protection-fund" onClick={toggleMenu}>Protection Fund</Link>
							<a href="https://github.com/Morlabs/BasedAgent1/blob/main/README.md#based-agent-protection-fund"
								 target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>Protection Fund</a>
							<a href="https://mor.org/MOR20" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>MOR20
								Platform!!</a>
						</div>
					</div>
					<a
						href="https://github.com/Morlabs/BasedAgent/blob/main/Contribute/contribution_guidelines.md"
						onClick={toggleMenu}
					>
						Contribute
					</a>
					<div className="dropdown">
						<Link href="#" onClick={toggleMenu}>Resources</Link>
						<div className="dropdown-content">
							<a
								href="https://github.com/Morlabs/BasedAgent1/blob/main/README.md"
								target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>Docs</a>
							<Link href="/faqs" onClick={toggleMenu}>FAQs</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DesktopNavbar

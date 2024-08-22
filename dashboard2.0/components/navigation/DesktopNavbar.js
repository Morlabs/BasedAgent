import React from 'react';
import Link from 'next/link';
import Logo from '../branding/Logo';
import {signOut, signIn} from 'next-auth/react';
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';

function DesktopNavbar({toggleMenu, menuActive}) {
	const {isLoggedIn, user} = useAuth(); // Use useAuth hook
	const router = useRouter();
	
	const handleRouting = async () => {
		router.push(`/account-management/${user?.id}`);
	}
	const handleLogout = async () => {
		if (isLoggedIn) {
			try {
				await signOut({redirect: false, callbackUrl: '/'});
				console.log('Logout successful');
				router.push('/');
			} catch (error) {
				console.error('Error during logout:', error);
			}
		} else {
			await signIn('github', {callbackUrl: '/user'});
		}
	};
	
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
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/Morlabs/BasedAgent/blob/main/Contribute/contribution_guidelines.md"
				>
					Contribute
				</a>
				<div className="dropdown">
					<Link href="#">Resources</Link>
					<div className="dropdown-content">
						<a
							href="https://github.com/Morlabs/BasedAgent1/blob/main/README.md"
							target="_blank"
							rel="noopener noreferrer"
						>
							Docs
						</a>
						<Link href="/faqs">FAQs</Link>
					</div>
				</div>
				
				{/* Avatar with Dropdown Menu */}
				<Popover className="relative">
					<PopoverButton className="inline-flex items-center gap-x-2">
						<img
							src={user?.image || '/default-user.png'} // Replace with the actual avatar image path
							alt="User Avatar"
							className="h-8 w-8 rounded-full"
						/>
						<ChevronDownIcon aria-hidden="true" className="h-5 w-5"/>
					</PopoverButton>
					
					<PopoverPanel
						className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
						<div className="py-1">
							{isLoggedIn ? (
								<>
									<div className="block px-4 py-2 text-sm text-gray-500">
										{user.name}
									</div>
									
									<hr className="border-gray-300 my-2 mx-2"/>
									
									<div className="block px-4 py-2 text-sm text-gray-500 cursor-pointer" onClick={handleRouting}>
										
										Account
									</div>
									<hr className="border-gray-300 my-2 mx-2"/>
									
									<button
										onClick={handleLogout}
										className="block w-full text-left px-4 py-2 text-sm text-gray-700"
									>
										Logout
									</button>
								</>
							) : (
								<>
									<hr className="border-gray-300 my-2"/>
									<button
										onClick={() => signIn('github', {callbackUrl: '/user'})}
										className="block w-full text-left px-4 py-2 text-sm text-gray-700"
									>
										Login
									</button>
									<hr className="border-gray-300 my-2"/>
								</>
							)}
						</div>
					
					</PopoverPanel>
				</Popover>
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
							<a
								href="https://github.com/Morlabs/BasedAgent1/blob/main/README.md#based-agent-protection-fund"
								target="_blank"
								rel="noopener noreferrer"
								onClick={toggleMenu}
							>
								Protection Fund
							</a>
							<a
								href="https://mor.org/MOR20"
								target="_blank"
								rel="noopener noreferrer"
								onClick={toggleMenu}
							>
								MOR20 Platform
							</a>
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
								target="_blank"
								rel="noopener noreferrer"
								onClick={toggleMenu}
							>
								Docs
							</a>
							<Link href="/faqs" onClick={toggleMenu}>FAQs</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DesktopNavbar;

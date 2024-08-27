import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Logo from '../branding/Logo';
import { signIn, signOut } from 'next-auth/react';

const navLink = [
    {
        name: 'About Based Agent',
        subLinks: [
            { name: 'About', href: '/about' },
            { name: 'BAAG Token', href: '/baag-token' },
            { name: 'Protection Fund', href: 'https://github.com/Morlabs/BasedAgent1/blob/main/README.md#based-agent-protection-fund' },
            { name: 'MOR20 Platform', href: 'https://mor.org/MOR20' },
        ],
    },
    { name: 'Contribute', href: 'https://github.com/Morlabs/BasedAgent/blob/main/Contribute/contribution_guidelines.md' },
    {
        name: 'Resources',
        subLinks: [
            { name: 'Docs', href: 'https://github.com/Morlabs/BasedAgent1/blob/main/README.md' },
            { name: 'FAQs', href: '/faqs' },
        ],
    },
];

export default function Example() {
    const { isLoggedIn, user } = useAuth();
    const router = useRouter();
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => setMenuActive(!menuActive);

    const handleRouting = async () => router.push(`/account-management/${user?.id}`);

    const handleLogout = async () => {
        if (isLoggedIn) {
            try {
                await signOut({ redirect: false, callbackUrl: '/' });
                console.log('Logout successful');
                router.push('/');
            } catch (error) {
                console.error('Error during logout:', error);
            }
        } else {
            await signIn('github', { callbackUrl: '/user' });
        }
    };

    let profileDropdown = isLoggedIn
        ? [
            { name: 'Account', href: '#', clickEvent: handleRouting },
            { name: 'Logout', href: '#', clickEvent: handleLogout },
        ]
        : [
            { name: 'Sign in', href: '#', clickEvent: () => signIn('github', { callbackUrl: '/user' }) },
        ];

    return (
        <Disclosure as="nav" className="bg-[#121212]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Logo />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navLink.map((item, itemIdx) => (
                                    <div key={itemIdx} className="relative">
                                        {item.subLinks ? (
                                            <Menu as="div" className="relative">
                                                <div>
                                                    <MenuButton className="text-lg group relative inline-flex items-center justify-center rounded-md font-medium text-white">
                                                        <span>{item.name}</span>
                                                        <ChevronDownIcon className="h-5 w-5 ml-2 -mr-1 text-white" aria-hidden="true" />
                                                    </MenuButton>
                                                </div>
                                                <MenuItems className="absolute z-10 -ml-4 mt-3 transform w-48 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {item.subLinks.map((subItem, subItemIdx) => (
                                                        <MenuItem key={subItemIdx}>
                                                            <Link href={subItem.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                                {subItem.name}
                                                            </Link>
                                                        </MenuItem>
                                                    ))}
                                                </MenuItems>
                                            </Menu>
                                        ) : (
                                            <Link href={item.href} className="text-lg text-white hover:text-white px-3 py-2  font-medium">
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex items-center">
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex items-center gap-1 rounded-full text-sm">
                                        <img
                                            alt=""
                                            src={user?.image || '/default-user.png'}
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    </MenuButton>
                                </div>
                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                                    {profileDropdown.map((item, itemIdx) => (
                                        <MenuItem key={itemIdx}>
                                            <a
                                                href={item.href}
                                                className="block px-4 py-2 text-sm text-gray-700"
                                                onClick={item.clickEvent}
                                            >
                                                {item.name}
                                            </a>
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                    <div className="-mr-2 flex sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navLink.map((item, itemIdx) => (
                        <div key={itemIdx} className="relative">
                            {item.subLinks ? (
                                <Disclosure as="div" className="relative">
                                    {({ open }) => (
                                        <>
                                            <DisclosureButton className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-300  hover:text-white">
                                                <span>{item.name}</span>
                                                <ChevronDownIcon
                                                    className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
                                                    aria-hidden="true"
                                                />
                                            </DisclosureButton>
                                            <DisclosurePanel className="mt-1 space-y-1">
                                                {item.subLinks.map((subItem, subItemIdx) => (
                                                    <Link
                                                        key={subItemIdx}
                                                        href={subItem.href}
                                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400  hover:text-white"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300  hover:text-white"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img
                                alt=""
                                src={user?.image || '/default-user.png'}
                                className="h-10 w-10 rounded-full"
                            />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-white">{user?.name || 'Guest User'}</div>
                            <div className="text-sm font-medium text-gray-400">{user?.email || 'guest@example.com'}</div>
                        </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        {profileDropdown.map((item, itemIdx) => (
                            <Link
                                key={itemIdx}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                onClick={item.clickEvent}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}

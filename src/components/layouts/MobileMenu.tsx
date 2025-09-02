'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '../common/Modal';

interface NavItem {
	name: string;
	href: string;
	description: string;
}

interface MobileMenuProps {
	navItems: NavItem[];
}

export function MobileMenu({ navItems }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<div className='md:hidden'>
			{/* The modal uses a portal. */}
			<Modal
				show={isOpen}
				onClose={closeMenu}
				direction='right'
				backdropClassName='top-[65px] items-start md:hidden'
				contentClassName='h-full w-full container py-4 px-0 rounded-l-lg'>
				<nav className='space-y-4'>
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							onClick={closeMenu}
							className='block px-4 py-2 text-foreground/80 hover:text-blue-400 transition-colors duration-200 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
							aria-label={item.description}>
							{item.name}
						</Link>
					))}
				</nav>
			</Modal>

			{/* Кнопка гамбургер-меню */}
			<button
				className='relative p-3 rounded-lg text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
				aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
				aria-expanded={isOpen}
				type='button'
				onClick={toggleMenu}>
				<div className='w-6 h-6 flex flex-col justify-center items-center'>
					<div className='w-full h-0.5 relative'>
						{/* Top line */}
						<span
							className={`
                absolute block w-full h-0.5 bg-gradient-to-r from-blue-400 to-fuchsia-300
                transition-all duration-300 ease-in-out
                ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}
              `}
						/>
						{/* Middle line */}
						<span
							className={`
                absolute block w-full h-0.5 bg-gradient-to-r from-blue-400 to-fuchsia-300
                transition-all duration-300 ease-in-out
                ${isOpen ? 'opacity-0' : 'opacity-100'}
              `}
						/>
						{/* Bottom line */}
						<span
							className={`
                absolute block w-full h-0.5 bg-gradient-to-r from-blue-400 to-fuchsia-300
                transition-all duration-300 ease-in-out
                ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}
              `}
						/>
					</div>
				</div>
			</button>
		</div>
	);
}

import Link from 'next/link';

const navItems = [
	{ name: 'Home', href: '/', description: 'Pixianium Home Page' },
	{ name: 'About', href: '/about', description: 'About Pixianium Studio' },
];

export function Header() {
	return (
		<>
			<header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
				<div className='container mx-auto px-4 md:px-6 lg:px-8'>
					<div className='flex h-16 items-center justify-between'>
						{/* Logo */}
						<div className='flex items-center'>
							<Link href='/' className='text-2xl font-bold'>
								<span className='bg-gradient-to-r from-blue-400 via-fuchsia-300 to-lime-300 bg-clip-text text-transparent hover:from-blue-500 hover:via-fuchsia-400 hover:to-lime-200 transition duration-300'>
									Pixianium
								</span>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<nav
							className='hidden md:flex items-center space-x-8'
							role='navigation'
							aria-label='Main navigation'>
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className='text-foreground/80 hover:text-blue-400 transition-colors duration-200 font-medium relative group'
									aria-label={item.description}>
									{item.name}
									<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-fuchsia-300 group-hover:w-full transition-all duration-300'></span>
								</Link>
							))}
						</nav>

						{/* Mobile menu button */}
						<button
							className='md:hidden p-2 rounded-lg text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
							aria-label='Open mobile menu'
							aria-expanded='false'
							type='button'>
							<svg
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								aria-hidden='true'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Navigation Menu (скрыто по умолчанию) */}
				<div className='md:hidden border-t border-gray-200 bg-background'>
					<div className='px-4 py-3 space-y-2'>
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className='block px-3 py-2 text-foreground/80 hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200'
								aria-label={item.description}>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			</header>
		</>
	);
}

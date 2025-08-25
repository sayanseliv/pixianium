import Link from 'next/link';
import { MobileMenu } from './MobileMenu';

const navItems = [
	{ name: 'Home', href: '/', description: 'Pixianium Home Page' },
	{ name: 'About', href: '/about', description: 'About Pixianium' },
];

export function Header() {
	return (
		<>
			<header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
				<div className='container mx-auto px-4 md:px-6 lg:px-8'>
					<div className='flex h-16 items-center justify-between'>
						{/* Logo */}
						<div className='flex items-center'>
							<Link
								href='/'
								className='text-2xl font-bold group relative overflow-hidden'>
								<span className='bg-gradient-to-r from-blue-400 via-fuchsia-300 to-lime-300 bg-clip-text text-transparent'>
									Pixianium
								</span>

								<div className='absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:w-full transition-all duration-1000 skew-x-12'></div>
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
									<span className='absolute -bottom-1 left-0 w-0 h-0.5 rounded-lg bg-gradient-to-r from-blue-400 to-fuchsia-300 group-hover:w-full transition-all duration-300'></span>
								</Link>
							))}
						</nav>

						{/* Mobile menu button */}
						<MobileMenu navItems={navItems} />
					</div>
				</div>
			</header>
		</>
	);
}

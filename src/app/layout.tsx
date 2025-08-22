import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Pixianium – Interactive Animation Showcases & Tutorials',
	description:
		'Pixianium is a creative playground for exploring animations with Pixi.js, GSAP, Three.js, and Anime.js. Each page is a mini experiment with interactive particles, 3D effects, and transformations, accompanied by tutorials and code examples.',
	keywords: [
		'Pixi.js',
		'GSAP',
		'Three.js',
		'Anime.js',
		'Web Animation',
		'JavaScript',
		'Creative Coding',
		'Interactive Particles',
		'3D Effects',
		'Frontend Experiments',
		'Code Tutorials',
		'Pixianium',
	],
	authors: [{ name: 'Lang Eugen' }],
	openGraph: {
		title: 'Pixianium – Interactive Animation Showcases & Tutorials',
		description:
			'Explore creative web animations built with Pixi.js, GSAP, Three.js, and Anime.js. Every demo comes with explanations and code.',
		url: 'https://pixianium.com',
		siteName: 'Pixianium',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Pixianium Animation Playground',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Pixianium – Interactive Animation Showcases & Tutorials',
		description:
			'Creative playground with Pixi.js, GSAP, Three.js, and Anime.js demos. Tutorials and code included.',
		images: ['/og-image.png'],
		creator: '@pixianium',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${manrope.variable} antialiased`}>{children}</body>
		</html>
	);
}

export const SITE_CONFIG = {
	name: 'Pixianium',
	description:
		'Interactive Animation Showcase - Explore amazing animations with Pixi.js, Three.js, GSAP, and more',
	url: 'https://pixianium.dev',
	author: {
		name: 'Pixianium Team',
		// email: 'hello@pixianium.dev',
	},
	social: {
		github: 'https://github.com/sayanseliv/pixianium',
		// twitter: 'https://twitter.com/pixianium',
		// discord: 'https://discord.gg/pixianium',
	},
} as const;
export const ANIMATION_CATEGORIES = {
	PIXI: 'pixi',
	THREEJS: 'threejs',
	GSAP: 'gsap',
	CSS: 'css',
	ANIME: 'anime',
} as const;
export const DIFFICULTY_LEVELS = {
	BEGINNER: 'beginner',
	INTERMEDIATE: 'intermediate',
	ADVANCED: 'advanced',
} as const;
export const ROUTES = {
	HOME: '/',
	ABOUT: '/about',
	TUTORIALS: '/tutorials',
	PIXI_ANIMATIONS: '/pixi-animations',
	THREEJS_ANIMATIONS: '/threejs-animations',
	GSAP_ANIMATIONS: '/gsap-animations',
	CSS_ANIMATIONS: '/css-animations',
	ANIME_DEMOS: '/animejs-demos',
} as const;

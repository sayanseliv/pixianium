export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat('uk-UA', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
}
// formatDate(new Date('2025-08-23')) // "23 серпня 2025"
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/[\s-]+/g, '-');
}
// slugify('Привіт Світ!') // "privit-svit"

export function getRandomColor(): string {
	const colors = [
		'var(--blue-300)',
		'var(--fuchsia-300)',
		'var(--lime-300)',
		'var(--purple-300)',
	];
	return colors[Math.floor(Math.random() * colors.length)];
}
// const color = getRandomColor() // "var(--fuchsia-300)"

export function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout | null = null;

	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}
// Purpose: Prevents a function from being called too often.

export function throttle<T extends (...args: unknown[]) => unknown>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;

	return function (this: unknown, ...args: Parameters<T>) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}
// Purpose: Limits the frequency of function calls.

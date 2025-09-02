'use client';
import { useEffect, useRef, useState } from 'react';

const BackgroundCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	let animationId: number;
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		const particles: {
			x: number;
			y: number;
			vx: number;
			vy: number;
			size: number;
			opacity: number;
			hue: number;
		}[] = [];

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		const createParticle = () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: (Math.random() - 0.5) * 0.5,
			vy: (Math.random() - 0.5) * 0.5,
			size: Math.random() * 2 + 1,
			opacity: Math.random() * 0.5 + 0.2,
			hue: Math.random() * 360,
		});
		const initParticles = () => {
			particles.length = 0;
			for (let i = 0; i < 100; i++) {
				particles.push(createParticle());
			}
		};
		const animate = () => {
			if (!ctx) return;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			particles.forEach((particle, index) => {
				particle.x += particle.vx;
				particle.y += particle.vy;

				if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
				if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

				particle.hue += 0.5;

				ctx.save();
				ctx.globalAlpha = particle.opacity;
				ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();

				// Connect nearby particles
				particles.forEach((otherParticle, otherIndex) => {
					if (index !== otherIndex) {
						const dx = particle.x - otherParticle.x;
						const dy = particle.y - otherParticle.y;
						const distance = Math.sqrt(dx * dx + dy * dy);

						if (distance < 100) {
							ctx.save();
							ctx.globalAlpha = ((100 - distance) / 100) * 0.2;
							ctx.strokeStyle = `hsl(${
								(particle.hue + otherParticle.hue) / 2
							}, 70%, 60%)`;
							ctx.lineWidth = 1;
							ctx.beginPath();
							ctx.moveTo(particle.x, particle.y);
							ctx.lineTo(otherParticle.x, otherParticle.y);
							ctx.stroke();
							ctx.restore();
						}
					}
				});
			});

			animationId = requestAnimationFrame(animate);
		};
		resizeCanvas();
		initParticles();
		animate();
		setIsLoaded(true);

		window.addEventListener('resize', resizeCanvas);
		return () => {
			window.removeEventListener('resize', resizeCanvas);
			cancelAnimationFrame(animationId);
		};
	}, []);
	return (
		<canvas
			ref={canvasRef}
			className='absolute inset-0 z-0'
			style={{ background: 'radial-gradient(ellipse at center, #0f172a 0%, #000000 70%)' }}
		/>
	);
};
export default BackgroundCanvas;

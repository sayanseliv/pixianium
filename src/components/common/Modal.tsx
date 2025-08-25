'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Direction =
	| 'center'
	| 'top'
	| 'bottom'
	| 'left'
	| 'right'
	| 'topLeft'
	| 'topRight'
	| 'bottomLeft'
	| 'bottomRight';

type ModalProps = {
	show: boolean;
	onClose: () => void;
	children: React.ReactNode;
	direction?: Direction;
	className?: string;
	backdropClassName?: string;
};

const getModalVariants = (direction: Direction): Variants => {
	const variants: Record<Direction, Variants> = {
		center: {
			hidden: {
				opacity: 0,
				scale: 0.75,
			},
			visible: {
				opacity: 1,
				scale: 1,
				transition: { duration: 0.3, ease: 'easeOut' },
			},
		},
		top: {
			hidden: {
				opacity: 0,
				y: '-100dvh',
			},
			visible: {
				opacity: 1,
				y: 0,
				transition: { duration: 0.4, ease: 'easeOut' },
			},
		},
		bottom: {
			hidden: {
				opacity: 0,
				y: '100dvh',
			},
			visible: {
				opacity: 1,
				y: 0,
				transition: { duration: 0.4, ease: 'easeOut' },
			},
		},
		left: {
			hidden: {
				opacity: 0,
				x: '-100vw',
			},
			visible: {
				opacity: 1,
				x: 0,
				transition: { duration: 0.4, ease: 'easeOut' },
			},
		},
		right: {
			hidden: {
				opacity: 0,
				x: '100vw',
			},
			visible: {
				opacity: 1,
				x: 0,
				transition: { duration: 0.4, ease: 'easeOut' },
			},
		},
		topLeft: {
			hidden: {
				opacity: 0,
				x: '-100vw',
				y: '-100dvh',
				scale: 0.8,
			},
			visible: {
				opacity: 1,
				x: 0,
				y: 0,
				scale: 1,
				transition: { duration: 0.5, ease: 'easeOut' },
			},
		},
		topRight: {
			hidden: {
				opacity: 0,
				x: '100vw',
				y: '-100vh',
				scale: 0.8,
			},
			visible: {
				opacity: 1,
				x: 0,
				y: 0,
				scale: 1,
				transition: { duration: 0.5, ease: 'easeOut' },
			},
		},
		bottomLeft: {
			hidden: {
				opacity: 0,
				x: '-100vw',
				y: '100dvh',
				scale: 0.8,
			},
			visible: {
				opacity: 1,
				x: 0,
				y: 0,
				scale: 1,
				transition: { duration: 0.5, ease: 'easeOut' },
			},
		},
		bottomRight: {
			hidden: {
				opacity: 0,
				x: '100vw',
				y: '100dvh',
				scale: 0.8,
			},
			visible: {
				opacity: 1,
				x: 0,
				y: 0,
				scale: 1,
				transition: { duration: 0.5, ease: 'easeOut' },
			},
		},
	};

	return variants[direction];
};

const getBackdropVariants = (direction: Direction): Variants => {
	const hasDelay = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].includes(direction);

	return {
		visible: {
			opacity: 1,
			transition: hasDelay ? { delay: 0.1, duration: 0.3 } : { duration: 0.3 },
		},
		hidden: {
			opacity: 0,
			transition: { duration: 0.2 },
		},
	};
};

const Modal: React.FC<ModalProps> = ({
	show,
	onClose,
	children,
	direction = 'center',
	className = '',
	backdropClassName = '',
}) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	useEffect(() => {
		if (show) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [show]);

	const stop = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const modalVariants = getModalVariants(direction);
	const backdropVariants = getBackdropVariants(direction);

	if (!mounted) return null;

	return createPortal(
		<AnimatePresence>
			{show && (
				<motion.div
					className={`
            fixed inset-0 z-[9999]
            bg-gray-900/80 backdrop-blur-sm
            overflow-hidden
            ${backdropClassName}
          `}
					variants={backdropVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
					onClick={onClose}>
					<motion.div
						className={`
							absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
							bg-background border border-gray-600/50 shadow-2xl
							p-6 max-w-lg w-full mx-4
							backdrop-blur-md
							${className}
							`}
						variants={modalVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						onClick={stop}>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	);
};

export default Modal;

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
	backdropClassName?: string;
	contentClassName?: string;
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

const getPositionClasses = (direction: Direction): string => {
	const positionClasses: Record<Direction, string> = {
		center: 'flex items-center justify-center',
		top: 'flex items-start justify-center pt-8',
		bottom: 'flex items-end justify-center pb-8',
		left: 'flex items-center justify-start pl-8',
		right: 'flex items-center justify-end',
		topLeft: 'flex items-start justify-start p-8',
		topRight: 'flex items-start justify-end p-8',
		bottomLeft: 'flex items-end justify-start p-8',
		bottomRight: 'flex items-end justify-end p-8',
	};

	return positionClasses[direction];
};

const Modal: React.FC<ModalProps> = ({
	show,
	onClose,
	children,
	direction = 'center',
	backdropClassName = '',
	contentClassName = '',
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

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.currentTarget === e.target) {
			onClose();
		}
	};

	const handleContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const modalVariants = getModalVariants(direction);
	const backdropVariants = getBackdropVariants(direction);
	const positionClasses = getPositionClasses(direction);

	if (!mounted) return null;

	return createPortal(
		<AnimatePresence>
			{show && (
				<motion.div
					className={`
						fixed inset-0 z-[9999]
						w-full h-screen
						bg-gray-900/80 backdrop-blur-sm
						overflow-hidden
						${positionClasses}
						${backdropClassName}
					`}
					variants={backdropVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
					onClick={handleBackdropClick}>
					<motion.div
						className={`
							bg-white dark:bg-gray-800 
							border border-gray-200 dark:border-gray-700 
							shadow-2xl
							${contentClassName}
						`}
						variants={modalVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						onClick={handleContentClick}>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	);
};

export default Modal;

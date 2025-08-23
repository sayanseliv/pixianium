'use client';
import Modal from '@/components/common/Modal';
import React, { useState } from 'react';
export default function Home() {
	const [showAnimated, setShowAnimated] = useState(false);
	const [direction, setDirection] = useState<'center' | 'top' | 'bottom' | 'left' | 'right'>(
		'center'
	);

	return (
		<section className='bg-background min-h-screen'>
			<div className='container mx-auto py-8 px-4 md:px-6 lg:px-8 space-y-6'>
				<h1 className='text-3xl font-bold mb-8 text-blue-400'>Home</h1>

				{/* Buttons */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					<button
						onClick={() => setShowAnimated(true)}
						className='
            px-6 py-3 rounded-lg bg-lime-300 text-gray-900 
            font-medium transition-all duration-200
            hover:shadow-lg hover:shadow-lime-300/25
          '>
						Animated Modal
					</button>
				</div>

				{/* Direction selector */}
				<div className='space-y-2'>
					<label className='block text-sm font-medium text-foreground/80'>
						Animation Direction:
					</label>
					<select
						value={direction}
						onChange={(e) =>
							setDirection(
								e.target.value as 'center' | 'top' | 'bottom' | 'left' | 'right'
							)
						}
						className='
            px-3 py-2 rounded-lg bg-gray-700 text-foreground 
            border border-gray-600 focus:ring-2 focus:ring-blue-400/50
          '>
						<option value='center'>Center</option>
						<option value='top'>From Top</option>
						<option value='bottom'>From Bottom</option>
						<option value='left'>From Left</option>
						<option value='right'>From Right</option>
					</select>
				</div>

				{/* Animated Modal */}
				<Modal
					show={showAnimated}
					onClose={() => setShowAnimated(false)}
					direction={direction}
					className='bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-fuchsia-300/30'>
					<div className='text-center'>
						<h3 className='text-xl font-bold bg-gradient-to-r from-lime-300 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent mb-4'>
							Animated from {direction}!
						</h3>
						<p className='text-foreground/80 mb-6'>
							This modal animates from the <strong>{direction}</strong> direction with
							neon styling.
						</p>
						<div className='flex justify-center gap-3'>
							<button
								onClick={() => setShowAnimated(false)}
								className='px-6 py-2 bg-gradient-to-r from-fuchsia-300 to-purple-300 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-fuchsia-300/25 transition-all'>
								Amazing! 🚀
							</button>
						</div>
					</div>
				</Modal>
			</div>
		</section>
	);
}

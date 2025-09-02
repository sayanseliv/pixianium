import BackgroundCanvas from '@/components/common/BackgroundCanvas';

export default function Home() {
	return (
		<section className='relative min-h-screen bg-black overflow-hidden'>
			<BackgroundCanvas />
			<div className='container mx-auto py-8 px-4 md:px-6 lg:px-8 space-y-6'>
				<h1 className='text-3xl font-bold mb-8 text-blue-400'>Home</h1>
			</div>
		</section>
	);
}

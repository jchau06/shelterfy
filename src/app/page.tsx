import { Exo } from 'next/font/google'

const exo = Exo({ subsets: ['latin']})

export default function Home() {

	return (
		<main className={exo.className}>
			<div className='flex flex-grow flex-col items-center justify-center h-[90vh]'>
				<div>
					<h1 className='text-5xl text-red-400 mb-5'>Shelterfy</h1>
					<h2 className='text-3xl text-white-400'>
						Reliable Shelters, Reliable People
					</h2>
				</div>
			</div>
		</main>
	);
}

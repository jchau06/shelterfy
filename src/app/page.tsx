import { Exo } from 'next/font/google'
import Image from 'next/image'

const exo = Exo({ subsets: ['latin'], weight: ['400', '700'] })


export default function Home() {

	return (
		<main className={exo.className}>
			<div className='flex flex-grow flex-row items-center justify-center h-[90vh] space-x-10'>
				<div>
					<Image
						src="/shelterfy_icons/logo1.png" // Remove "/public"
						width={500}
						height={500}
						alt="Shelterfy Logo"
					/>
				</div>
				<div>
					<h1 className='text-5xl text-orange-400 mb-5 font-bold'>Shelterfy</h1>
					<h2 className='text-3xl text-white-400'>
						Reliable Shelters, Reliable People
					</h2>
				</div>
			</div>
		</main>
	);
}

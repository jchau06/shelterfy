import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
	SignUpButton,
} from '@clerk/nextjs';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body>
					<nav className='flex justify-between m-6'>
						<div>
							<Link href='/'>
								<Image
									src='/logo.png'
									alt='Logo and Shelterfy name'
									width={150}
									height={30}
								/>
							</Link>
						</div>
						<div className='flex items-center justify-center gap-x-9'>
							<Link href='/saved-locations'>
								<span className='font-bold text-xl'>
									Saved Locations
								</span>
							</Link>
							<Link href='/find-shelter'>
								<span className='font-bold text-xl'>
									Find Shelter
								</span>
							</Link>
							<SignedOut>
								<SignInButton />
								<SignUpButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</div>
					</nav>
					<main>{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}

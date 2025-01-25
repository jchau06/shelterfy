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
import { Exo } from 'next/font/google'

const exo = Exo({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;

}) {
	return (
			<ClerkProvider>
				<html lang='en' className={exo.className}>
					<body>
						<nav className='flex justify-end m-5 space-x-4'>
							<Link href='/find-shelter'>Find Shelter</Link>
							<SignedOut>
								<SignInButton />
								<SignUpButton />
							</SignedOut>
							<SignedIn>
								<Link href='/saved-places'>Saved Places</Link>
								<UserButton />
							</SignedIn>
						</nav>
							<main>{children}</main>
					</body>
				</html>
			</ClerkProvider>
	);
}
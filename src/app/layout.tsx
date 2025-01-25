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
import { Provider } from "@/components/ui/provider"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
			<ClerkProvider>
				<html lang='en'>
					<body>
						<nav className='flex justify-end m-5 space-x-4'>
							<Link href='/find-shelter'>Find Shelter</Link>
							<SignedOut>
								<SignInButton />
								<SignUpButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</nav>
						<Provider>
							<main>{children}</main>
						</Provider>
					</body>
				</html>
			</ClerkProvider>
	);
}
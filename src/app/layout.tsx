import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
  SignOutButton,
  SignUpButton,
  
} from '@clerk/nextjs';
import './globals.css';
import Link from 'next/link'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body>
					<header className='flex justify-end m-5 space-x-7'>
            <Link href="/find-shelter">
            Find Shelter
            </Link>
            <SignedOut>
							<SignInButton />
              <SignUpButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
              <SignOutButton/>
						</SignedIn>
					</header>
					<main>{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}

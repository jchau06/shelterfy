import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs';
import './globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body>
					<header className='flex justify-end m-5'>
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</header>
					<main>{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}

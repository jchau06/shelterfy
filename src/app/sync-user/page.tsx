import { auth, clerkClient } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

const SyncUser = async () => {
	const { userId } = await auth();
	if (!userId) {
		throw new Error('User not found');
	}
	const client = await clerkClient();
	const user = await client.users.getUser(userId);
	if (!user.emailAddresses[0]?.emailAddress) {
		return notFound();
	}

	// Use "user" to update database here

	return redirect('/dashboard');
};

export default SyncUser;

import { auth, clerkClient } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import axios, { AxiosError } from "axios";

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
	try {
		const response = await axios.post("http://localhost:3001/create",
			{
				clerkId: userId,
				userName: user.username,
				fName: user.firstName,
				lName: user.lastName,
				email: user.primaryEmailAddress

			}
		);
		
	  } catch (error) {
		console.error("Error inserting user data:", error);
	  }

	return redirect('/dashboard');
};

export default SyncUser;

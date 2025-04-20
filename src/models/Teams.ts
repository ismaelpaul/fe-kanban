import { z } from 'zod';

export const TeamNameSchema = z.object({
	name: z.string().nonempty({ message: "Can't be empty" }),
});

export const TeamInvitationsSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Can't be empty" })
		.email({ message: 'Invalid email address' }),
});

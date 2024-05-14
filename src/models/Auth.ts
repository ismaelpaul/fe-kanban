import { z } from 'zod';
import { emailExists } from '../api/kanbanApi';

export const LoginSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Can't be empty." })
		.email('This is not a valid email.')
		.refine(async (email) => {
			return await emailExists(email);
		}, 'This email is not registered'),
	password: z.string(),
});

export const RegisterSchema = z
	.object({
		firstName: z
			.string()
			.min(2, { message: 'First name must contain at least 2 characters' }),
		lastName: z
			.string()
			.min(2, { message: 'Last name must contain at least 2 characters' }),
		email: z
			.string()
			.min(2, { message: 'Email must contain at least 2 characters' })
			.email('This is not a valid email.')
			.refine(async (email) => {
				const exists = await emailExists(email);
				if (exists) {
					return 'This email is already in use';
				}
			}, 'This email is not in our database'),
		password: z.string(),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

import { z } from 'zod';
import { emailExists } from '../api/kanbanApi';

export const LoginSchema = z.object({
	email: z
		.string()
		.min(2, { message: "Can't be empty." })
		.email('This is not a valid email.')
		.refine(async (email) => {
			return await emailExists(email);
		}, 'This email is not registered'),
	password: z
		.string()
		.min(6, { message: 'Password has at least 6 characters' })
		.nonempty({ message: "Can't be empty" }),
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
			.email('Please enter a valid email.'),
		password: z
			.string()
			.min(6, { message: 'Password must contain at least 6 characters' })
			.nonempty({ message: "Can't be empty" }),
		confirmPassword: z.string().min(6).nonempty({ message: "Can't be empty" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

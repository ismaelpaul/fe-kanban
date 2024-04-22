import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().min(1, { message: "Can't be empty." }),
	// TODO:
	// .email('This is not a valid email.').refine(async (e) => {
	//     // make a request to the backend
	//     // to see if the email is valid.
	//     return await checkIfEmailIsValid(e);
	//   }, "This email is not in our database")
	password: z.string(),
});

export const RegisterSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	password: z.string(),
});

import { z } from 'zod';

export const TeamNameSchema = z.object({
	name: z.string().nonempty({ message: "Can't be empty" }),
});

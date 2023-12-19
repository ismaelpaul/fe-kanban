import { z } from 'zod';

export const SubtaskSchema = z.object({
	subtask_id: z.number(),
	title: z.string().nonempty({ message: "Can't be empty" }),
	is_completed: z.boolean().default(false),
	placeholder: z.string(),
});

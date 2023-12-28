import { z } from 'zod';

export const SubtaskSchema = z.object({
	subtask_id: z.number().optional(),
	title: z.string().nonempty({ message: "Can't be empty" }),
	is_completed: z.boolean().default(false),
	placeholder: z.string().optional(),
	is_new: z.boolean().optional(),
});

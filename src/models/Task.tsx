import { z } from 'zod';
import { SubtaskSchema } from './Subtask';

export const TaskSchema = z.object({
	column_id: z.number().optional(),
	title: z.string().nonempty({ message: "Can't be empty" }),
	description: z.string(),
	status: z.string(),
});

export const TaskSubmitSchema = TaskSchema.extend({
	subtasks: z.array(SubtaskSchema),
});

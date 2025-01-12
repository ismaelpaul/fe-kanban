import { z } from 'zod';

export const CommentSubmitSchema = z.object({
	comment: z.string().nonempty({ message: 'Please add a comment' }),
	task_id: z.coerce.number(),
	user_id: z.coerce.number(),
});

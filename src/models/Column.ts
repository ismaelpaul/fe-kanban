import { z } from 'zod';

export const ColumnSchema = z.object({
	column_id: z.number(),
	name: z.string().max(50).nonempty({ message: "Can't be empty" }),
	placeholder: z.string().optional(),
	is_new: z.boolean().optional(),
});

export const ColumnSubmit = z.object({
	name: z.string().max(50).nonempty({ message: "Can't be empty" }),
});

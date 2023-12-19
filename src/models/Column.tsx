import { z } from 'zod';

export const ColumnSchema = z.object({
	column_id: z.number().optional(),
	column_name: z.string().max(50).nonempty({ message: "Can't be empty" }),
});

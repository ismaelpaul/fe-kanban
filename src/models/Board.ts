import { z } from 'zod';
import { ColumnSchema } from './Column';

export const BoardSchema = z.object({
	board_id: z.number().optional(),
	name: z.string().max(50).nonempty({ message: "Can't be empty" }),
});

export const BoardSubmitSchema = BoardSchema.extend({
	columns: z.array(ColumnSchema),
});

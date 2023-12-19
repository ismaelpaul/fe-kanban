import { z } from 'zod';
import { ColumnSchema } from './Column';

export const BoardSchema = z.object({
	board_id: z.number().optional(),
	board_name: z.string().max(50).nonempty({ message: "Can't be empty" }),
	columns: z.array(ColumnSchema),
});

import { SingleColumn } from '@/interfaces/IColumn';
import { QueryClient } from '@tanstack/react-query';

type ColumnAddedHandler = {
	type: string;
	column: SingleColumn;
};

export const columnAddedHandler = (
	data: ColumnAddedHandler,
	queryClient: QueryClient
) => {
	const boardId = data.column.board_id;
	queryClient.invalidateQueries(['columns', boardId]);
};

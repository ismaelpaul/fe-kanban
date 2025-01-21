import { QueryClient } from '@tanstack/react-query';

type TaskEditHandler = {
	type: string;
	newColumn_id: number | null;
	column_id: number;
};
export const taskEditHandler = (
	data: TaskEditHandler,
	queryClient: QueryClient
) => {
	const newColumnId = data.newColumn_id;
	const columnId = data.column_id;

	if (newColumnId) {
		queryClient.invalidateQueries(['tasks', newColumnId]);
		queryClient.invalidateQueries(['tasks', columnId]);
	} else {
		queryClient.invalidateQueries(['tasks', columnId]);
	}
};

import { SingleSubtask } from '@/interfaces/ISubtask';
import { QueryClient } from '@tanstack/react-query';

type UpdateSubtaskCompletionHandler = {
	type: string;
	subtask: SingleSubtask;
};

export const updateSubtaskCompletionHandler = (
	data: UpdateSubtaskCompletionHandler,
	queryClient: QueryClient
) => {
	const columnId = data.subtask.column_id;

	queryClient.invalidateQueries(['tasks', columnId]);
};

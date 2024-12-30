import { SingleTask } from '@/interfaces/ITask';
import { QueryClient } from '@tanstack/react-query';

type UpdateTaskCompletionHandler = {
	type: string;
	task: SingleTask[];
};
export const updateTaskCompletionHandler = (
	data: UpdateTaskCompletionHandler,
	queryClient: QueryClient
) => {
	const columnId = data.task[0].column_id;

	queryClient.invalidateQueries(['tasks', columnId]);
};

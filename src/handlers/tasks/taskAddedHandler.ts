import { SingleTask } from '@/interfaces/ITask';
import { QueryClient } from '@tanstack/react-query';

type TaskAddedHandler = {
	type: string;
	task: SingleTask;
};
export const taskAddedAndDeleteHandler = (
	data: TaskAddedHandler,
	queryClient: QueryClient
) => {
	const columnId = data.task.column_id;

	queryClient.invalidateQueries(['tasks', columnId]);
};

import { useQuery } from '@tanstack/react-query';
import { getSubtasksByTaskId } from '../api/kanbanApi';
import { ISubtasks } from '../interfaces/ISubtask';

const useFetchSubtasks = (taskId: number) => {
	const subtaskQueryKey = `subtasks_${taskId}`;

	const { data, isLoading, isError } = useQuery([subtaskQueryKey], () =>
		getSubtasksByTaskId(taskId)
	);

	const { subtasks } = (data as ISubtasks) || { subtasks: [] };

	return { subtasks, isLoading, isError };
};

export default useFetchSubtasks;

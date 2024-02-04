import { useQuery } from '@tanstack/react-query';
import { getSubtasksByTaskId } from '../api/kanbanApi';
import { ISubtasks } from '../interfaces/ISubtask';
import { useEffect } from 'react';

const useFetchSubtasks = (taskId: number) => {
	const subtaskQueryKey = `subtasks_${taskId}`;

	const { data, isLoading, isError, refetch } = useQuery(
		[subtaskQueryKey],
		() => getSubtasksByTaskId(taskId),
		{
			enabled: false,
		}
	);

	const { subtasks } = (data as ISubtasks) || { subtasks: [] };

	useEffect(() => {
		refetch();
	}, []);

	return { subtasks, isLoading, isError };
};

export default useFetchSubtasks;

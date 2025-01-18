import { getTaskCommentsByTaskId } from '@/api/kanbanApi';

import { useQuery } from '@tanstack/react-query';

const useFetchTaskComments = (taskId: number) => {
	const queryKey = ['comments', taskId];

	const { data, isLoading, isError } = useQuery(queryKey, () =>
		getTaskCommentsByTaskId(taskId)
	);

	const { comments } = data || [];

	return { comments, isLoading, isError };
};

export { useFetchTaskComments };

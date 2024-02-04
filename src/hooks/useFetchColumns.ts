import { useQuery } from '@tanstack/react-query';
import { getColumnsByBoardId } from '../api/kanbanApi';
import { IColumns } from '../interfaces/IColumn';

const useFetchColumns = (boardId: number) => {
	const queryKey = ['columns', boardId];

	const { data, isLoading, isError } = useQuery(queryKey, () =>
		getColumnsByBoardId(boardId)
	);

	const { columns } = (data as IColumns) || { subtasks: [] };

	return { columns, isLoading, isError };
};

export default useFetchColumns;

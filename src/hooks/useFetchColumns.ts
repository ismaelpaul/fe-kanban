import { useQuery } from '@tanstack/react-query';
import { getColumnsByBoardId } from '../api/kanbanApi';
import { IColumns } from '../interfaces/IColumn';
import { useEffect } from 'react';

const useFetchColumns = (boardId: number) => {
	const queryKey = ['columns', boardId];

	const { data, isLoading, isError, refetch } = useQuery(queryKey, () =>
		getColumnsByBoardId(boardId)
	);

	const { columns } = (data as IColumns) || { columns: [] };

	useEffect(() => {
		refetch();
	}, [boardId, refetch]);

	return { columns, isLoading, isError };
};

export default useFetchColumns;

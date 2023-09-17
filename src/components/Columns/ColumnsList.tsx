import React, { useEffect } from 'react';
import { getColumnsByBoardId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import { IColumns } from '../../interfaces/IColumn';
import useBoardStore from '../../store/boardStore';
import { useQueryClient } from 'react-query';
import Column from './Column';

const ColumnsList = () => {
	const boardId = useBoardStore((state) => state.boardId);
	console.log(boardId, '<<< board id');

	const queryClient = useQueryClient();

	const queryKey = ['columns', boardId];

	const { data, isLoading, isError } = useFetch({
		queryKey: queryKey,
		queryFn: () => getColumnsByBoardId(boardId),
	});
	console.log(data);

	useEffect(() => {
		queryClient.invalidateQueries('columns');
	}, [boardId, queryClient]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	const { columns }: IColumns = data || { columns: [] };

	return (
		<div className="flex gap-6 overflow-x-scroll h-screen bg-light-bg px-4 py-8">
			{columns.map((column, index) => {
				console.log(column.column_id);

				return (
					<React.Fragment key={column.column_id}>
						<Column index={index} column={column} />
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default ColumnsList;

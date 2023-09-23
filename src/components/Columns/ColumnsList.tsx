import React, { useEffect } from 'react';
import { getColumnsByBoardId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import { IColumns } from '../../interfaces/IColumn';
import useBoardStore from '../../store/boardStore';
import { useQueryClient } from 'react-query';
import Column from './Column';
import EmptyBoard from '../Boards/EmptyBoard';

const ColumnsList = () => {
	const boardId = useBoardStore((state) => state.boardId);

	const queryClient = useQueryClient();

	const queryKey = ['columns', boardId];

	const { data, isLoading, isError } = useFetch({
		queryKey: queryKey,
		queryFn: () => getColumnsByBoardId(boardId),
	});

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

	if (columns.length === 0) {
		return <EmptyBoard />;
	}

	return (
		<div className="flex gap-6 overflow-x-scroll h-screen bg-light-bg dark:bg-dark-bg px-4 py-8 mt-16">
			{columns.map((column, index) => {
				return (
					<React.Fragment key={column.column_id}>
						<Column index={index} column={column} />
					</React.Fragment>
				);
			})}
			<div className="bg-gradient-to-b from-linear to-linear-50 dark:from-dark-grey dark:to-dark-grey-50 w-[17.5rem] flex items-center rounded-md mt-12">
				<span className="text-l-heading block w-[17.5rem] text-medium-grey text-center">
					+ New Column
				</span>
			</div>
		</div>
	);
};

export default ColumnsList;

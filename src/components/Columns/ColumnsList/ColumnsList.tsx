import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { updateTaskPositionAndStatus } from '@/api/kanbanApi';

import { useBoardStore } from '@/store/boards';
import { useTasksStore } from '@/store/tasks';

import { useFetchColumns, usePatch } from '@/hooks';

import { AddNewColumnModal } from '../AddNewColumnModal';
import { EmptyBoard } from '@/components/Boards/EmptyBoard';
import { Column } from '../Column/Column';
import { useModalStore } from '@/store/modals';

type ColumnsListProps = {
	setBoardHasColumns: (arg: boolean) => void;
	boardHasColumns: boolean;
};

const ColumnsList = ({
	boardHasColumns,
	setBoardHasColumns,
}: ColumnsListProps) => {
	const selectedBoard = useBoardStore((state) => state.selectedBoard);
	const boardId = selectedBoard.board_id;

	const { modals, openModal } = useModalStore();

	const queryClient = useQueryClient();

	const { columns, isLoading, isError } = useFetchColumns(boardId);

	const { patch } = usePatch();

	useEffect(() => {
		columns.length > 0 ? setBoardHasColumns(true) : setBoardHasColumns(false);
	}, [columns.length]);

	const handleDragAndDrop = async (result: DropResult) => {
		const { source, destination } = result;

		const taskId = Number(result.draggableId);

		const columnId = Number(source.droppableId);
		const newColumnId = Number(destination?.droppableId);

		const newColumnIndex = columns.findIndex(
			(column) => column.column_id === newColumnId
		);

		const taskPosition = source.index;
		const newTaskPosition = destination?.index ?? -1;

		if (columnId === newColumnId && taskPosition === newTaskPosition) {
			return;
		}

		const currentState = useTasksStore.getState();

		const tasksCopy = { ...currentState.tasks };

		// // Find the task in the current state
		const taskToMove = tasksCopy[columnId][taskPosition];

		// Remove the task from its original position
		tasksCopy[columnId].splice(taskPosition, 1);

		// Insert the task into its new position
		tasksCopy[newColumnId].splice(newTaskPosition, 0, taskToMove);

		const updatedData = {
			currentColumnId: columnId,
			newColumnId: newColumnId,
			currentTaskPosition: taskPosition + 1,
			newTaskPosition: newTaskPosition + 1,
			newStatus: columns[newColumnIndex].name,
		};

		const queryKey = 'tasks';

		await patch({
			patchFn: updateTaskPositionAndStatus,
			resourceId: taskId,
			updatedData,
			queryKey,
		});

		queryClient.invalidateQueries([queryKey, newColumnId]);
		queryClient.invalidateQueries([queryKey, columnId]);
	};

	if (!boardHasColumns) {
		return (
			<>
				{modals.addNewColumnModal && <AddNewColumnModal />}

				<div className="flex justify-center my-auto">
					<EmptyBoard />
				</div>
			</>
		);
	}

	return (
		<>
			{isLoading && <span>Loading..</span>}
			{isError && <span>Error: </span>}
			<div className="flex gap-4">
				<DragDropContext onDragEnd={handleDragAndDrop}>
					{columns.map((column, index) => (
						<Droppable
							key={column.column_id}
							droppableId={column.column_id.toString()}
							type="group"
						>
							{(provided, snapshot) => (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									<Column
										index={index}
										column={column}
										isDragging={snapshot.isDraggingOver}
									/>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					))}
					<div
						onClick={() => openModal('addNewColumnModal')}
						className="bg-gradient-to-b from-linear to-linear-50 dark:from-dark-grey dark:to-dark-grey-50 w-[17.5rem] flex items-center rounded-md mt-12"
					>
						<span className="text-l-heading block w-[17.5rem] text-medium-grey text-center cursor-pointer transition ease-in-out duration-300 hover:text-purple">
							+ New Column
						</span>
					</div>
				</DragDropContext>
				{modals.addNewColumnModal && <AddNewColumnModal />}
			</div>
		</>
	);
};

export { ColumnsList };

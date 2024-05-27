import { useEffect, useState } from 'react';
import { updateTaskPositionAndStatus } from '../../api/kanbanApi';
import { useQueryClient } from '@tanstack/react-query';
import Column from './Column';
import EmptyBoard from '../Boards/EmptyBoard';
import useBoardStore from '../../store/boardStore';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import usePatch from '../../hooks/usePatch';
import useTasksStore from '../../store/tasksStore';
import useColumnsStore from '../../store/columnsStore';
import AddNewColumnModal from './AddNewColumnModal';
import useFetchColumns from '../../hooks/useFetchColumns';

type ColumnsListProps = {
	setBoardHasColumns: (arg: boolean) => void;
};

const ColumnsList = ({ setBoardHasColumns }: ColumnsListProps) => {
	const [isAddNewColumnModalOpen, setIsAddNewColumnModalOpen] = useState(false);

	const selectedBoard = useBoardStore((state) => state.selectedBoard);
	const boardId = selectedBoard.board_id;

	const setColumns = useColumnsStore((state) => state.setColumns);

	const queryClient = useQueryClient();

	const { columns, isLoading, isError } = useFetchColumns(boardId);

	const { patch } = usePatch();

	useEffect(() => {
		if (columns.length > 0) {
			setBoardHasColumns(true);
		}
		setColumns(columns);
	}, [columns.length]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	if (!columns.length) {
		return (
			<>
				{isAddNewColumnModalOpen ? (
					<AddNewColumnModal
						setIsAddNewColumnModalOpen={setIsAddNewColumnModalOpen}
					/>
				) : (
					<></>
				)}
				<EmptyBoard setIsAddNewColumnModalOpen={setIsAddNewColumnModalOpen} />
			</>
		);
	}

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

	return (
		<>
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
							</div>
						)}
					</Droppable>
				))}
				<div
					onClick={() => setIsAddNewColumnModalOpen(true)}
					className="bg-gradient-to-b from-linear to-linear-50 dark:from-dark-grey dark:to-dark-grey-50 w-[17.5rem] flex items-center rounded-md mt-12"
				>
					<span className="text-l-heading block w-[17.5rem] text-medium-grey text-center cursor-pointer transition ease-in-out duration-300 hover:text-purple">
						+ New Column
					</span>
				</div>
			</DragDropContext>
			{isAddNewColumnModalOpen ? (
				<AddNewColumnModal
					setIsAddNewColumnModalOpen={setIsAddNewColumnModalOpen}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default ColumnsList;

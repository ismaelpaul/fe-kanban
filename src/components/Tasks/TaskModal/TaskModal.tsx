import { useCallback, useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { useClickOutside, useWebSocket } from '@/hooks';

import { useBoardStore } from '@/store/boards';

import { IColumns, SingleColumn } from '@/interfaces/IColumn';
import { SingleTask } from '@/interfaces/ITask';
import { SingleSubtask } from '@/interfaces/ISubtask';

import { ModalHeader } from '@/components/ModalHeader/ModalHeader';
import { KebabMenuModal } from '@/components/KebabMenu/KebabMenuModal';
import { DeleteModal } from '@/components/DeleteModal/DeleteModal';
import { TaskDetails } from '../TaskDetails';
import { TaskActions } from '../TaskActions';
import { Overlay } from '@/components/Overlay';
import { TaskCommentsList } from '../TaskComments/TaskCommentsList';
import { AddNewComment } from '../TaskComments/AddNewComment';
import { Button } from '@/components/Button';

interface TaskModalProps {
	task: SingleTask;
	subtasks: SingleSubtask[];
	totalSubtasks: number;
	completedSubtasks: number;
	columnId: number;
	setCompletedSubtasks: (taskId: number, subtasksCount: number) => void;
	setIsTaskModalOpen: (arg: boolean) => void;
	setIsEditTaskModalOpen: (arg: boolean) => void;
	isTaskCompleted: boolean;
}

const TaskModal = ({
	task,
	setIsTaskModalOpen,
	subtasks,
	totalSubtasks,
	completedSubtasks,
	setIsEditTaskModalOpen,
	isTaskCompleted,
}: TaskModalProps) => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isKebabMenuModalOpen, setIsKebabMenuModalOpen] = useState(false);

	const queryClient = useQueryClient();

	const { sendMessage } = useWebSocket();

	const selectedBoard = useBoardStore((state) => state.selectedBoard);

	const boardId = selectedBoard.board_id;

	const data = queryClient.getQueryData<IColumns>(['columns', boardId]);

	const columns = useMemo(() => data?.columns || [], [data]);

	const options = useMemo(
		() =>
			columns.map((column: SingleColumn) => ({
				id: column.column_id,
				label: column.name,
				value: column.name,
			})),
		[columns]
	);

	const initialSelectedOption = options.find(
		(option) => option.label === task.status
	);

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => {
		if (!isDeleteModalOpen) {
			setIsTaskModalOpen(false);
		}
	});

	const handleDeleteTask = useCallback(
		(taskId: number) => {
			sendMessage('DELETE_TASK', { task_id: taskId });
			setIsDeleteModalOpen(false);
			setIsTaskModalOpen(false);
		},
		[sendMessage, setIsTaskModalOpen]
	);

	const handleKebabMenu = () => {
		setIsKebabMenuModalOpen(!isKebabMenuModalOpen);
	};

	const handleToggleCompletion = useCallback(() => {
		sendMessage('UPDATE_TASK_COMPLETION', {
			task_id: task.task_id,
			is_completed: !task.is_completed,
		});
	}, [sendMessage, task.task_id, task.is_completed]);

	return (
		<>
			<Overlay>
				<motion.dialog
					aria-modal="true"
					open
					initial={{ scale: 0.7 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.2 }}
					className="bg-white dark:bg-dark-grey p-6 h-[86vh] max-w-[90vw] overflow-y-scroll no-scrollbar z-50 tablet:w-[30rem] tablet:ml-auto laptop:rounded-none laptop:mx-0 laptop:ml-auto"
					ref={modalRef}
					role="dialog"
					aria-labelledby="modal-heading"
				>
					<ModalHeader title={task.title} handleKebabMenu={handleKebabMenu} />

					{isKebabMenuModalOpen ? (
						<KebabMenuModal
							editText={'Edit Task'}
							deleteText={'Delete Task'}
							menuPosition={'right-8 tablet:right-40 laptop:right-4'}
							setIsDeleteModalOpen={setIsDeleteModalOpen}
							setIsTaskModalOpen={setIsTaskModalOpen}
							isParentTaskModal={true}
							setIsEditTaskModalOpen={setIsEditTaskModalOpen}
							setIsKebabMenuModalOpen={setIsKebabMenuModalOpen}
						/>
					) : (
						<></>
					)}

					<TaskActions
						isTaskCompleted={isTaskCompleted}
						onToggleCompletion={handleToggleCompletion}
					/>

					<TaskDetails
						description={task.description}
						subtasks={subtasks}
						completedSubtasks={completedSubtasks}
						totalSubtasks={totalSubtasks}
						selectedOption={initialSelectedOption || options[0]}
						options={options}
					/>

					<hr className="my-5 border-medium-grey/30" />

					<TaskCommentsList taskId={task.task_id} />
					<AddNewComment taskId={task.task_id} />
					<Button
						form={'task-comment-form'}
						type="submit"
						buttonClass={
							'bg-purple text-white text-13px font-bold py-2 w-full rounded-full'
						}
						buttonText={'Add comment'}
					/>
				</motion.dialog>
			</Overlay>
			{isDeleteModalOpen ? (
				<DeleteModal
					onClick={() => {
						handleDeleteTask(task.task_id);
					}}
					itemName={task.title}
					parentComponent="TaskModal"
					setIsDeleteModalOpen={setIsDeleteModalOpen}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export { TaskModal };

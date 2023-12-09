import { useRef, useState } from 'react';
import {
	deleteTaskById,
	updateSubtaskCompletionById,
} from '../../api/kanbanApi';
import { SingleSubtask } from '../../interfaces/ISubtask';
import { SingleTask } from '../../interfaces/ITask';
import Dropdown from '../Dropdown/Dropdown';
import CheckIcon from '../SVGComponents/CheckIcon';
import KebabMenu from '../SVGComponents/KebabMenu';
import useClickOutside from '../../hooks/useClickOutside';
import usePatch from '../../hooks/usePatch';
import KebabMenuModal from '../KebabMenu/KebabMenuModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import useDelete from '../../hooks/useDelete';
import { useQueryClient } from '@tanstack/react-query';
import useBoardStore from '../../store/boardStore';
import { IColumns, SingleColumn } from '../../interfaces/IColumn';
import { motion } from 'framer-motion';

interface TaskModalProps {
	task: SingleTask;
	setIsTaskModalOpen: (arg: boolean) => void;
	subtasks: SingleSubtask[];
	totalSubtasks: number;
	completedSubtasks: number;
	setCompletedSubtasks: (arg: number) => void;
	columnId: number;
}

const TaskModal = ({
	task,
	setIsTaskModalOpen,
	subtasks,
	totalSubtasks,
	completedSubtasks,
	setCompletedSubtasks,
	columnId,
}: TaskModalProps) => {
	const [isKebabModalOpen, setIsKebabModalOpen] = useState(false);
	const [updatingSubtask, setUpdatingSubtask] = useState<number | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const isParentTaskModal = true;

	const boardId = useBoardStore((state) => state.boardId);

	const queryKey = ['columns', boardId];

	const queryClient = useQueryClient();

	const { columns }: IColumns = queryClient.getQueryData(queryKey) || {
		columns: [],
	};

	const options = columns.map((column: SingleColumn) => {
		return (
			{ id: column.column_id, label: column.name, value: column.name } || {}
		);
	});
	const initialSelectedOption = options.find(
		(option) => option.label === task.status
	);

	const [selectedOption, setSelectedOption] = useState(
		initialSelectedOption || options[0]
	);

	const kebabMenuEdit = 'Edit Task';
	const kebabMenuDelete = 'Delete Task';
	const kebabMenuPosition = 'right-8 tablet:right-40 laptop:right-[30rem]';

	const { patch } = usePatch();
	const { deleteItem } = useDelete();

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => {
		if (!isDeleteModalOpen) {
			setIsTaskModalOpen(false);
		}
	});

	const handleKebabMenu = () => {
		setIsKebabModalOpen(!isKebabModalOpen);
	};

	const handleSubtaskCompletion = async (
		subtaskId: number,
		isCompleted: boolean
	) => {
		if (updatingSubtask === subtaskId) {
			isCompleted = !isCompleted;

			const newCompleted = isCompleted
				? completedSubtasks + 1
				: completedSubtasks - 1;

			setCompletedSubtasks(newCompleted);
			setUpdatingSubtask(null);
		} else {
			setUpdatingSubtask(subtaskId);
		}

		const newCompleted = isCompleted
			? completedSubtasks - 1
			: completedSubtasks + 1;

		setCompletedSubtasks(newCompleted);

		const updatedData = {
			is_completed: !isCompleted,
		};
		const queryKey = 'subtasks';

		await patch({
			patchFn: updateSubtaskCompletionById,
			resourceId: subtaskId,
			updatedData,
			queryKey,
		});
	};

	const handleDeleteTask = async (taskId: number) => {
		await deleteItem(() => deleteTaskById(taskId));
		setIsDeleteModalOpen(false);
		setIsTaskModalOpen(false);
		queryClient.invalidateQueries(['tasks', columnId]);
	};

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center z-40">
				<div className="fixed inset-0 bg-black opacity-50"></div>
				<motion.div
					initial={{ scale: 0.7 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.2 }}
					className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-4 w-screen tablet:mx-0 tablet:w-[30rem]"
					ref={modalRef}
				>
					<div className="flex items-center justify-between gap-4">
						<h1 className="text-l-heading dark:text-white">{task.title}</h1>
						<div onClick={handleKebabMenu} className="cursor-pointer">
							<KebabMenu />
						</div>
					</div>
					{isKebabModalOpen ? (
						<KebabMenuModal
							editText={kebabMenuEdit}
							deleteText={kebabMenuDelete}
							menuPosition={kebabMenuPosition}
							setIsDeleteModalOpen={setIsDeleteModalOpen}
							setIsKebabMenuOpen={setIsKebabModalOpen}
							setIsTaskModalOpen={setIsTaskModalOpen}
						/>
					) : (
						<></>
					)}
					<p className="text-l-body text-medium-grey mt-6">
						{task.description}
					</p>
					<span className="text-12px text-medium-grey dark:text-white font-bold inline-block mt-6 mb-2">
						Subtasks ({completedSubtasks} of {totalSubtasks})
					</span>
					{subtasks.map((subtask: SingleSubtask) => {
						const isCompleted = subtask.is_completed === true;

						return (
							<div
								key={subtask.subtask_id}
								className="flex items-center bg-lines-light dark:bg-dark-bg p-3 mt-2 rounded gap-4 transition ease-in-out duration-200 hover:dark:bg-purple/25"
							>
								<input
									type="checkbox"
									id={subtask.subtask_id.toString()}
									defaultChecked={isCompleted}
									onChange={() => {
										handleSubtaskCompletion(
											subtask.subtask_id,
											subtask.is_completed
										);
									}}
									className="relative peer appearance-none w-4 h-4 bg-white border border-medium-grey border-opacity-25 rounded-sm checked:bg-purple checked:border-0 cursor-pointer"
								/>
								<label
									htmlFor={subtask.subtask_id.toString()}
									className="text-12px dark:text-white font-bold peer-checked:opacity-50 peer-checked:line-through cursor-pointer"
								>
									{subtask.title}
								</label>
								<CheckIcon
									className={
										'absolute w-4 h-4 mt-2 ml-[3px] hidden peer-checked:block pointer-events-none'
									}
								/>
							</div>
						);
					})}
					<div className="mt-6">
						<span className="text-12px text-medium-grey dark:text-white font-bold inline-block mb-2">
							Current Status
						</span>
						<Dropdown
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
							options={options}
							isParentTaskModal={isParentTaskModal}
						/>
					</div>
				</motion.div>
			</div>
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

export default TaskModal;

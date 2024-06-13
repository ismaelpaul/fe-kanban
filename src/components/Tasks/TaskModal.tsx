import { useRef, useState } from 'react';
import { deleteTaskById } from '../../api/kanbanApi';
import { SingleSubtask } from '../../interfaces/ISubtask';
import { SingleTask } from '../../interfaces/ITask';
import Dropdown from '../Dropdown/Dropdown';
import useClickOutside from '../../hooks/useClickOutside';
import usePatch from '../../hooks/usePatch';
import KebabMenuModal from '../KebabMenu/KebabMenuModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import useDelete from '../../hooks/useDelete';
import { useQueryClient } from '@tanstack/react-query';
import { SingleColumn } from '../../interfaces/IColumn';
import { motion } from 'framer-motion';
import SubtasksList from '../Subtasks/SubtaskList';
import { handleSubtaskCompletion } from '../../utils/Subtask/SubtaskUtils';
import ModalHeader from '../ModalHeader/ModalHeader';
import useColumnsStore from '../../store/columnsStore';

interface TaskModalProps {
	task: SingleTask;
	subtasks: SingleSubtask[];
	totalSubtasks: number;
	completedSubtasks: number;
	columnId: number;
	setCompletedSubtasks: (arg: number) => void;
	setIsTaskModalOpen: (arg: boolean) => void;
	setIsEditTaskModalOpen: (arg: boolean) => void;
}

const TaskModal = ({
	task,
	setIsTaskModalOpen,
	subtasks,
	totalSubtasks,
	completedSubtasks,
	setCompletedSubtasks,
	columnId,
	setIsEditTaskModalOpen,
}: TaskModalProps) => {
	const [updatingSubtask, setUpdatingSubtask] = useState<number | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isKebabMenuModalOpen, setIsKebabMenuModalOpen] = useState(false);

	const queryClient = useQueryClient();

	const columns = useColumnsStore((state) => state.columns);

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
	const kebabMenuPosition = 'right-8 tablet:right-40 laptop:right-4';

	const { patch } = usePatch();
	const { deleteItem } = useDelete();

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => {
		if (!isDeleteModalOpen) {
			setIsTaskModalOpen(false);
		}
	});

	const handleSubtaskToggle = async (
		subtaskId: number,
		isCompleted: boolean
	) => {
		await handleSubtaskCompletion(
			subtaskId,
			isCompleted,
			updatingSubtask,
			completedSubtasks,
			setUpdatingSubtask,
			setCompletedSubtasks,
			patch
		);

		queryClient.invalidateQueries(['tasks', columnId]);
	};

	const handleDeleteTask = async (taskId: number) => {
		await deleteItem(() => deleteTaskById(taskId));
		setIsDeleteModalOpen(false);
		setIsTaskModalOpen(false);
		queryClient.invalidateQueries(['tasks', columnId]);
	};

	const handleKebabMenu = () => {
		setIsKebabMenuModalOpen(!isKebabMenuModalOpen);
	};

	return (
		<>
			<aside className="fixed inset-0 flex items-center justify-center z-40">
				<div className="fixed inset-0 bg-black opacity-50"></div>
				<motion.dialog
					aria-modal="true"
					open
					initial={{ scale: 0.7 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.2 }}
					className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-auto w-screen tablet:w-[30rem] max-h-[80vh] overflow-y-scroll no-scrollbar"
					ref={modalRef}
					role="dialog"
					aria-labelledby="modal-heading"
				>
					<ModalHeader title={task.title} handleKebabMenu={handleKebabMenu} />
					{isKebabMenuModalOpen ? (
						<KebabMenuModal
							editText={kebabMenuEdit}
							deleteText={kebabMenuDelete}
							menuPosition={kebabMenuPosition}
							setIsDeleteModalOpen={setIsDeleteModalOpen}
							setIsTaskModalOpen={setIsTaskModalOpen}
							isParentTaskModal={true}
							setIsEditTaskModalOpen={setIsEditTaskModalOpen}
							setIsKebabMenuModalOpen={setIsKebabMenuModalOpen}
						/>
					) : (
						<></>
					)}
					<p className="text-l-body text-medium-grey mt-6">
						{task.description}
					</p>
					<SubtasksList
						completedSubtasks={completedSubtasks}
						totalSubtasks={totalSubtasks}
						subtasks={subtasks}
						handleSubtaskToggle={handleSubtaskToggle}
					/>
					<div className="mt-6">
						<span className="text-12px text-medium-grey dark:text-white font-bold inline-block mb-2">
							Current Status
						</span>
						<Dropdown
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
							options={options}
							disabled={true}
						/>
					</div>
				</motion.dialog>
			</aside>
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

import { motion } from 'framer-motion';
import TaskForm from './TaskForm';
import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { SingleTask, TaskSubmit } from '../../interfaces/ITask';
import { SingleSubtask } from '../../interfaces/ISubtask';
import Button from '../Button/Button';

interface EditTaskModalProps {
	setIsEditTaskModalOpen: (arg: boolean) => void;
	task: SingleTask;
	subtasks: SingleSubtask[];
}
const EditTaskModal = ({
	setIsEditTaskModalOpen,
	task,
	subtasks,
}: EditTaskModalProps) => {
	const [taskData, setTaskData] = useState<Partial<TaskSubmit>>({});
	const modalRef = useRef(null);
	useClickOutside(modalRef, () => {
		setIsEditTaskModalOpen(false);
	});

	useEffect(() => {
		if (task || subtasks) {
			setTaskData({
				...task,
				subtasks,
			});
		}
	}, [task, subtasks]);

	const btnSaveChangesClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full';
	const btnSaveChangesText = 'Save Changes';

	return (
		<aside className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<motion.dialog
				aria-modal="true"
				open
				initial={{ scale: 0.7 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-auto w-screen tablet:w-[30rem]"
				ref={modalRef}
				role="dialog"
				aria-labelledby="modal-heading"
			>
				<h1 id="modal-heading" className="text-l-heading mb-6 dark:text-white">
					Edit Task
				</h1>
				<TaskForm
					taskData={taskData}
					isNewTask={false}
					setIsEditTaskModalOpen={setIsEditTaskModalOpen}
				/>
				<Button
					form={'task-form'}
					type="submit"
					buttonClass={btnSaveChangesClass}
					buttonText={btnSaveChangesText}
				/>
			</motion.dialog>
		</aside>
	);
};

export default EditTaskModal;

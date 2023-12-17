import { motion } from 'framer-motion';
import TaskForm from './TaskForm';
import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { SingleTask } from '../../interfaces/ITask';
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
	const modalRef = useRef(null);
	useClickOutside(modalRef, () => {
		setIsEditTaskModalOpen(false);
	});

	const initialValue = {
		...task,
		subtasks: subtasks.map((subtask) => {
			return subtask;
		}),
	};

	const btnSaveChangesClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full';
	const btnSaveChangesText = 'Save Changes';

	return (
		<div className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<motion.div
				initial={{ scale: 0.7 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-4 w-screen tablet:mx-0 tablet:w-[30rem]"
				ref={modalRef}
			>
				<h1 className="text-l-heading mb-6 dark:text-white">Edit Task</h1>
				<TaskForm initialValue={initialValue} />
				<Button
					form={'task-form'}
					type="submit"
					buttonClass={btnSaveChangesClass}
					buttonText={btnSaveChangesText}
				/>
			</motion.div>
		</div>
	);
};

export default EditTaskModal;

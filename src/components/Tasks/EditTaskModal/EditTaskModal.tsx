import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { useClickOutside } from '@/hooks';

import { SingleSubtask } from '@/interfaces/ISubtask';
import { SingleTask, TaskSubmit } from '@/interfaces/ITask';

import { TaskForm } from '../TaskForm';
import { Button } from '@/components/Button';
import { Overlay } from '@/components/Overlay';

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
		<Overlay>
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
		</Overlay>
	);
};

export { EditTaskModal };

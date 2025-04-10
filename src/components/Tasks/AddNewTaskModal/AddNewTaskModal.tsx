import { useRef } from 'react';
import { motion } from 'framer-motion';

import { useClickOutside } from '@/hooks';

import { TaskForm } from '../TaskForm';
import { Button } from '@/components/Button';
import { useModalStore } from '@/store/modals';
import { Overlay } from '@/components/Overlay';

const AddNewTaskModal = () => {
	const { closeModal } = useModalStore();

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => closeModal('addNewTaskModal'));

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
					Add New Task
				</h1>
				<TaskForm isNewTask={true} />
				<Button
					form={'task-form'}
					type="submit"
					buttonClass={
						'bg-purple text-white text-13px font-bold py-2 w-full rounded-full'
					}
					buttonText={'Create Task'}
				/>
			</motion.dialog>
		</Overlay>
	);
};

export { AddNewTaskModal };

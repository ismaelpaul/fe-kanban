import { useRef } from 'react';

import { motion } from 'framer-motion';

import { useClickOutside } from '@/hooks';

import { useModalStore } from '@/store/modals';

import { Button } from '@/components/Button/Button';
import { BoardForm } from '../BoardForm';
import { Overlay } from '@/components/Overlay';

const AddNewBoardModal = () => {
	const { closeModal } = useModalStore();

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => closeModal('addNewBoardModal'));

	const btnAddNewBoardClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full mt-6 hover:bg-purple-hover';
	const btnAddNewBoardText = 'Create New Board';

	return (
		<Overlay>
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
					Add New Board
				</h1>
				<BoardForm isNewBoard={true} />
				<Button
					form={'board-form'}
					buttonClass={btnAddNewBoardClass}
					buttonText={btnAddNewBoardText}
					type="submit"
				/>
			</motion.dialog>
		</Overlay>
	);
};

export { AddNewBoardModal };

import { useRef } from 'react';
import Button from '../Button/Button';
import useClickOutside from '../../hooks/useClickOutside';
import { motion } from 'framer-motion';
import BoardForm from './BoardForm';

interface AddNewBoardModalProps {
	setIsAddNewBoardModalOpen: (arg: boolean) => void;
}

const AddNewBoardModal = ({
	setIsAddNewBoardModalOpen,
}: AddNewBoardModalProps) => {
	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsAddNewBoardModalOpen(false));

	const btnAddNewBoardClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full mt-6 hover:bg-purple-hover';
	const btnAddNewBoardText = 'Create New Board';

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
					Add New Board
				</h1>
				<BoardForm
					setIsAddNewBoardModalOpen={setIsAddNewBoardModalOpen}
					isNewBoard={true}
				/>
				<Button
					form={'board-form'}
					buttonClass={btnAddNewBoardClass}
					buttonText={btnAddNewBoardText}
					type="submit"
				/>
			</motion.dialog>
		</aside>
	);
};

export default AddNewBoardModal;

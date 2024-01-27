import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import useBoardStore from '../../store/boardStore';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import BoardForm from './BoardForm';
import useColumnsStore from '../../store/columnsStore';

interface EditBoardModalProps {
	setIsEditBoardModalOpen: (arg: boolean) => void;
}

const EditBoardModal = ({ setIsEditBoardModalOpen }: EditBoardModalProps) => {
	const selectedBoard = useBoardStore((state) => state.selectedBoard);
	const columns = useColumnsStore((state) => state.columns);

	const boardData = {
		...selectedBoard,
		columns,
	};

	const btnSaveChangesClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full';
	const btnSaveChangesText = 'Save Changes';

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsEditBoardModalOpen(false));

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
					Edit Board
				</h1>
				<BoardForm
					boardData={boardData}
					isNewBoard={false}
					setIsEditBoardModalOpen={setIsEditBoardModalOpen}
				/>
				<Button
					form={'board-form'}
					type="submit"
					buttonClass={btnSaveChangesClass}
					buttonText={btnSaveChangesText}
				/>
			</motion.dialog>
		</aside>
	);
};

export default EditBoardModal;

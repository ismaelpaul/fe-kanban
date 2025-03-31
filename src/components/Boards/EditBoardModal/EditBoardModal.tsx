import { useRef } from 'react';

import { motion } from 'framer-motion';

import { useBoardStore } from '@/store/boards';
import { useModalStore } from '@/store/modals';

import { useClickOutside } from '@/hooks';
import { useCache } from '@/hooks/useCache';

import { IColumns } from '@/interfaces/IColumn';

import { BoardForm } from '../BoardForm';
import { Button } from '@/components/Button/Button';
import { Overlay } from '@/components/Overlay';

const EditBoardModal = () => {
	const { closeModal } = useModalStore();
	const selectedBoard = useBoardStore((state) => state.selectedBoard);

	const boardId = selectedBoard.board_id;

	const cachedData = useCache<IColumns>(['columns', boardId]);

	const columns = cachedData?.columns;

	const boardData = {
		...selectedBoard,
		columns,
	};

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => closeModal('editBoardModal'));

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
					Edit Board
				</h1>
				<BoardForm boardData={boardData} isNewBoard={false} />
				<Button
					form={'board-form'}
					type="submit"
					buttonClass={
						'bg-purple text-white text-13px font-bold py-2 w-full rounded-full'
					}
					buttonText={'Save Changes'}
				/>
			</motion.dialog>
		</Overlay>
	);
};

export { EditBoardModal };

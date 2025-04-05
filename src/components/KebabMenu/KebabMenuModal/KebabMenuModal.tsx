import { useClickOutside } from '@/hooks';
import { useModalStore } from '@/store/modals';
import { useRef } from 'react';

interface KebabMenuProps {
	editText: string;
	deleteText: string;
	menuPosition: string;
	setIsDeleteModalOpen: (arg: boolean) => void;
	setIsTaskModalOpen?: (arg: boolean) => void;
	setIsEditBoardModalOpen?: (arg: boolean) => void;
	setIsEditTaskModalOpen?: (arg: boolean) => void;
	isParentTaskModal?: boolean;
}

const KebabMenuModal = ({
	editText,
	deleteText,
	menuPosition,
	setIsEditTaskModalOpen,
	isParentTaskModal,
	setIsTaskModalOpen,
	setIsDeleteModalOpen,
}: KebabMenuProps) => {
	const modalRef = useRef(null);
	useClickOutside(modalRef, () => closeModal('kebabMenu'));

	const { openModal, closeModal } = useModalStore();

	const handleDeleteModal = () => {
		closeModal('kebabMenu');
		setIsDeleteModalOpen(true);
	};

	const handleEditModal = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isParentTaskModal) {
			setIsTaskModalOpen!(false);
			setIsEditTaskModalOpen!(true);
		} else {
			openModal('editBoardModal');
		}
		closeModal('kebabMenu');
	};

	return (
		<div
			className={`flex flex-col gap-4 px-4 py-[1.375rem] w-48 bg-white dark:bg-dark-bg rounded-lg absolute z-50 drop-shadow-card top-[4rem] ${menuPosition}`}
			ref={modalRef}
		>
			<span
				onClick={(e) => {
					handleEditModal(e);
				}}
				className="text-l-body text-medium-grey cursor-pointer hover:text-light-bg"
			>
				{editText}
			</span>
			<span
				onClick={handleDeleteModal}
				className="text-l-body text-red cursor-pointer hover:text-light-bg"
			>
				{deleteText}
			</span>
		</div>
	);
};

export { KebabMenuModal };

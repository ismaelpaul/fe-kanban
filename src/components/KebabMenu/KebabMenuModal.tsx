interface KebabMenuProps {
	editText: string;
	deleteText: string;
	menuPosition: string;
	setIsKebabMenuOpen: (arg: boolean) => void;
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
	setIsKebabMenuOpen,
	setIsDeleteModalOpen,
	setIsEditBoardModalOpen,
	setIsEditTaskModalOpen,
	isParentTaskModal,
	setIsTaskModalOpen,
}: KebabMenuProps) => {
	const handleDeleteModal = () => {
		setIsKebabMenuOpen(false);
		setIsDeleteModalOpen(true);
	};

	const handleEditModal = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isParentTaskModal) {
			setIsTaskModalOpen!(false);
			setIsEditTaskModalOpen!(true);
		} else {
			setIsTaskModalOpen!(false);
			setIsEditBoardModalOpen!(true);
		}
		setIsKebabMenuOpen(false);
	};

	return (
		<>
			<div
				className={`flex flex-col gap-4 pl-4 py-[1.375rem] w-48 bg-white dark:bg-dark-bg rounded-lg absolute drop-shadow-card ${menuPosition}`}
			>
				<span
					onClick={(e) => {
						handleEditModal(e);
					}}
					className="text-l-body text-medium-grey cursor-pointer"
				>
					{editText}
				</span>
				<span
					onClick={handleDeleteModal}
					className="text-l-body text-red cursor-pointer"
				>
					{deleteText}
				</span>
			</div>
		</>
	);
};

export default KebabMenuModal;

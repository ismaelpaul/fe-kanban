interface KebabMenuProps {
	editText: string;
	deleteText: string;
	menuPosition: string;
	setIsDeleteModalOpen: (arg: boolean) => void;
	setIsTaskModalOpen?: (arg: boolean) => void;
	setIsEditBoardModalOpen?: (arg: boolean) => void;
	setIsEditTaskModalOpen?: (arg: boolean) => void;
	isParentTaskModal: boolean;
	setIsKebabMenuModalOpen: (arg: boolean) => void;
}

const KebabMenuModal = ({
	editText,
	deleteText,
	menuPosition,
	setIsDeleteModalOpen,
	setIsEditBoardModalOpen,
	setIsEditTaskModalOpen,
	isParentTaskModal,
	setIsTaskModalOpen,
	setIsKebabMenuModalOpen,
}: KebabMenuProps) => {
	const handleDeleteModal = () => {
		setIsKebabMenuModalOpen(false);
		setIsDeleteModalOpen(true);
	};

	const handleEditModal = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isParentTaskModal) {
			setIsTaskModalOpen!(false);
			setIsEditTaskModalOpen!(true);
		} else {
			setIsEditBoardModalOpen!(true);
		}
		setIsKebabMenuModalOpen(false);
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

export { KebabMenuModal };

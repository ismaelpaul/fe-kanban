interface KebabMenuProps {
	editText: string;
	deleteText: string;
	menuPosition: string;
	setIsKebabMenuOpen: (arg: boolean) => void;
	setIsDeleteModalOpen: (arg: boolean) => void;
	setIsTaskModalOpen?: (arg: boolean) => void;
}

const KebabMenuModal = ({
	editText,
	deleteText,
	menuPosition,
	setIsKebabMenuOpen,
	setIsDeleteModalOpen,
	setIsTaskModalOpen,
}: KebabMenuProps) => {
	const handleDeleteModal = () => {
		setIsKebabMenuOpen(false);
		console.log('task modal');

		setIsTaskModalOpen?.(false);
		setIsDeleteModalOpen(true);
	};

	return (
		<>
			<div
				className={`flex flex-col gap-4 pl-4 py-[1.375rem] w-48 bg-white rounded-lg absolute drop-shadow-card ${menuPosition}`}
			>
				<span className="text-l-body text-medium-grey cursor-pointer">
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

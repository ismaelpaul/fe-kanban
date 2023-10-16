import Button from '../Button/Button';

interface DeleteModalPros {
	itemName: string;
	parentComponent: string;
	setIsDeleteModalOpen: (arg: boolean) => void;
	onClick: () => void;
}

const DeleteModal = ({
	itemName,
	parentComponent,
	setIsDeleteModalOpen,
	onClick,
}: DeleteModalPros) => {
	const deleteBtnTex = 'Delete';
	const deleteBtnClass =
		'bg-red text-white text-13px font-bold py-2 w-full rounded-full mb-4 tablet:mb-0 tablet:py-3';

	const cancelBtnText = 'Cancel';
	const cancelBtnClass =
		'bg-purple bg-opacity-10 dark:bg-white text-purple text-13px font-bold py-2 w-full rounded-full tablet:py-3';

	const item = parentComponent === 'Nav' ? 'board' : 'task';
	const complementaryText =
		item === 'board'
			? ' board? This action will remove all columns and tasks and '
			: 'task and its subtasks? This action ';

	return (
		<div className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div className="bg-white dark:bg-dark-bg p-6 rounded-md z-50 mx-4 w-screen tablet:w-[30rem]">
				<h1 className="text-l-heading text-red mb-6">Delete this {item}?</h1>
				<p className="text-l-body text-medium-grey mb-6">
					Are you sure you want to delete the '{itemName}' {complementaryText}{' '}
					cannot be reversed.
				</p>
				<div className="flex tablet:flex-row gap-4">
					<Button
						buttonText={deleteBtnTex}
						buttonClass={deleteBtnClass}
						onClick={onClick}
					/>
					<Button
						buttonText={cancelBtnText}
						buttonClass={cancelBtnClass}
						onClick={() => setIsDeleteModalOpen(false)}
					/>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;

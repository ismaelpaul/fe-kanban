import { Button } from '@/components/Button';
import { Overlay } from '@/components/Overlay';
import { motion } from 'framer-motion';

interface DeleteModalPros {
	itemType: string;
	itemName: string | null;
	setIsDeleteModalOpen: (arg: boolean) => void;
	onClick: () => void;
}

const DeleteModal = ({
	itemType,
	itemName,
	setIsDeleteModalOpen,
	onClick,
}: DeleteModalPros) => {
	const complementaryText =
		itemType === 'board'
			? ' board? This action will remove all columns and tasks and '
			: 'task and its subtasks? This action ';

	return (
		<Overlay>
			<motion.dialog
				aria-modal="true"
				open
				initial={{ scale: 0.7 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className="bg-white dark:bg-dark-bg p-6 rounded-md z-50 mx-auto w-screen tablet:w-[30rem]"
				role="dialog"
				aria-labelledby="modal-heading"
			>
				<h1 id="modal-heading" className="text-l-heading text-red mb-6">
					Delete this {itemType}?
				</h1>
				<p className="text-l-body text-medium-grey mb-6">
					Are you sure you want to delete the '{itemName}' {complementaryText}{' '}
					cannot be reversed.
				</p>
				<div className="flex flex-col tablet:flex-row gap-4">
					<Button
						buttonText={'Delete'}
						buttonClass={
							'bg-red text-white text-13px font-bold py-2 w-full rounded-full tablet:mb-0 tablet:py-3 hover:bg-red-hover'
						}
						onClick={onClick}
					/>
					<Button
						buttonText={'Cancel'}
						buttonClass={
							'bg-purple bg-opacity-10 dark:bg-white text-purple text-13px font-bold py-2 w-full rounded-full tablet:py-3 hover:bg-purple/25'
						}
						onClick={() => setIsDeleteModalOpen(false)}
					/>
				</div>
			</motion.dialog>
		</Overlay>
	);
};

export { DeleteModal };

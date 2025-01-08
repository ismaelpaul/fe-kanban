import { BoardIcon } from '@/components/SVGComponents/BoardIcon';
import { useModalStore } from '@/store/modals';
import { useState } from 'react';

const CreateNewBoard = () => {
	const [isHovering, setIsHovering] = useState(false);
	const { openModal, closeModal } = useModalStore();

	const handleAddNewBoardModal = () => {
		openModal('addNewBoardModal');
		closeModal('sidebarNav');
	};

	return (
		<div
			className="flex items-center gap-3 h-12 text-m-heading pl-6 cursor-pointer text-purple hover:text-medium-grey"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<BoardIcon
				iconClass={`${isHovering ? 'fill-medium-grey' : 'fill-purple'}`}
			/>
			<span onClick={handleAddNewBoardModal}> + Create New Board</span>
		</div>
	);
};

export { CreateNewBoard };

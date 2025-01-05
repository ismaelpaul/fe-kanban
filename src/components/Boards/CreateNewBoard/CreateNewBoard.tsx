import { BoardIcon } from '@/components/SVGComponents/BoardIcon';
import { useModalStore } from '@/store/modals';

const CreateNewBoard = () => {
	const { openModal, closeModal } = useModalStore();

	const handleAddNewBoardModal = () => {
		openModal('addNewBoardModal');
		closeModal('sidebarNav');
	};

	return (
		<div className="flex items-center gap-3 h-12 text-m-heading pl-6 cursor-pointer text-purple">
			<BoardIcon iconClass={'fill-purple'} />
			<span onClick={handleAddNewBoardModal}> + Create New Board</span>
		</div>
	);
};

export { CreateNewBoard };

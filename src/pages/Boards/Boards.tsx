import { useState } from 'react';

import ToggleSidebar from '../../components/Toggle/ToggleSidebar';
import ColumnsList from '../../components/Columns/ColumnsList';
import Nav from '../../components/Nav/Nav';
import AddNewBoardModal from '../../components/Boards/AddNewBoardModal';
import EditBoardModal from '../../components/Boards/EditBoardModal';
import MainSkeleton from '../../components/SkeletonLoader/MainSkeleton';

import useFetchBoards from '../../hooks/useFetchBoards';

const Boards = () => {
	const [isAllBoardsOpen, setIsAllBoardsOpen] = useState(false);
	const [isAddNewBoardModalOpen, setIsAddNewBoardModalOpen] = useState(false);
	const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
	const [boardHasColumns, setBoardHasColumns] = useState(false);

	const { boards, isLoading, isError } = useFetchBoards();

	if (isLoading) {
		return <MainSkeleton />;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	return (
		<>
			<Nav
				boards={boards}
				isAllBoardsOpen={isAllBoardsOpen}
				setIsAllBoardsOpen={setIsAllBoardsOpen}
				setIsAddNewBoardModalOpen={setIsAddNewBoardModalOpen}
				setIsEditBoardModalOpen={setIsEditBoardModalOpen}
			/>
			<main
				className={`flex ${
					boardHasColumns ? '' : 'justify-center'
				} gap-5 overflow-x-scroll h-screen w-screen fixed bg-light-bg dark:bg-dark-bg pl-4 pt-8 ${
					isAllBoardsOpen
						? 'tablet:ml-[16.5rem] transition-all ease-in-out duration-300'
						: ''
				}`}
			>
				<ColumnsList setBoardHasColumns={setBoardHasColumns} />
			</main>
			<ToggleSidebar
				setIsAllBoardsOpen={setIsAllBoardsOpen}
				isAllBoardsOpen={isAllBoardsOpen}
			/>
			{isAddNewBoardModalOpen ? (
				<AddNewBoardModal
					setIsAddNewBoardModalOpen={setIsAddNewBoardModalOpen}
				/>
			) : (
				<></>
			)}
			{isEditBoardModalOpen ? (
				<EditBoardModal setIsEditBoardModalOpen={setIsEditBoardModalOpen} />
			) : (
				<></>
			)}
		</>
	);
};

export default Boards;

import { useState } from 'react';
import ColumnsList from './components/Columns/ColumnsList';
import Nav from './components/Nav/Nav';
import useFetch from './hooks/useFetch';
import { getAllBoards } from './api/kanbanApi';
import { Boards } from './interfaces/IBoard';
import AddNewBoardModal from './components/Boards/AddNewBoardModal';
import EditBoardModal from './components/Boards/EditBoardModal';
import ToggleSidebar from './components/Toggle/ToggleSidebar';

function App() {
	const [isAllBoardsOpen, setIsAllBoardsOpen] = useState(false);
	const [isAddNewBoardModalOpen, setIsAddNewBoardModalOpen] = useState(false);
	const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);

	const { data, isLoading, isError } = useFetch({
		queryKey: ['boards'],
		queryFn: getAllBoards,
	});

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	const { boards }: Boards = data || { boards: [] };

	return (
		<>
			<Nav
				boards={boards}
				isAllBoardsOpen={isAllBoardsOpen}
				setIsAllBoardsOpen={setIsAllBoardsOpen}
				setIsAddNewBoardModalOpen={setIsAddNewBoardModalOpen}
				setIsEditBoardModalOpen={setIsEditBoardModalOpen}
			/>
			<ColumnsList isAllBoardsOpen={isAllBoardsOpen} />
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
}

export default App;

import { useState } from 'react';
import ColumnsList from './components/Columns/ColumnsList';
import Nav from './components/Nav/Nav';
import AddNewBoardModal from './components/Boards/AddNewBoardModal';
import EditBoardModal from './components/Boards/EditBoardModal';
import ToggleSidebar from './components/Toggle/ToggleSidebar';
import useFetchBoards from './hooks/useFetchBoards';

function App() {
	const [isAllBoardsOpen, setIsAllBoardsOpen] = useState(false);
	const [isAddNewBoardModalOpen, setIsAddNewBoardModalOpen] = useState(false);
	const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);

	const { boards, isLoading, isError } = useFetchBoards();

	if (isLoading) {
		return <span>Loading...</span>;
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

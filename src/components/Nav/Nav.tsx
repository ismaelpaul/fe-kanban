import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import ChevronDown from '../SVGComponents/ChevronDown';
import { deleteBoardById, getAllBoards } from '../../api/kanbanApi';
import LogoMobile from '../SVGComponents/LogoMobile';
import KebabMenu from '../SVGComponents/KebabMenu';
import AddTaskMobile from '../SVGComponents/AddTaskMobile';
import AllBoards from '../Boards/AllBoards';
import ChevronUp from '../SVGComponents/ChevronUp';
import useFetch from '../../hooks/useFetch';
import { Boards } from '../../interfaces/IBoard';
import AddNewTaskModal from '../Tasks/AddNewTaskModal';
import KebabMenuModal from '../KebabMenu/KebabMenuModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import AddNewBoardModal from '../Boards/AddNewBoardModal';
import useDelete from '../../hooks/useDelete';
import useBoardStore from '../../store/boardStore';

const Nav = () => {
	const [selectedBoard, setSelectedBoard] = useState('');
	const [isAllBoardsOpen, setIsAllBoardsOpen] = useState(false);
	const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
	const [isKebabModalOpen, setIsKebabModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isAddNewBoardkModalOpen, setIsAddNewBoardModalOpen] = useState(false);

	const boardId = useBoardStore((state) => state.boardId);
	const setBoardId = useBoardStore((state) => state.setBoardId);

	const kebabMenuEdit = 'Edit Board';
	const kebabMenuDelete = 'Delete Board';
	const kebabMenuPosition = 'top-16 right-4';

	const { deleteItem } = useDelete();

	const { data, isLoading, isError } = useFetch({
		queryKey: ['boards'],
		queryFn: getAllBoards,
	});

	const firstBoard = (data as { boards: { name: string }[] } | undefined)
		?.boards[0]?.name;

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const boardName = urlSearchParams.get('boardName') || firstBoard;
		const boardId = urlSearchParams.get('boardID') || '1';

		setBoardId(Number(boardId));

		if (boardName) {
			setSelectedBoard(boardName);
		}
	}, [firstBoard, setBoardId, data]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	const { boards }: Boards = data || { boards: [] };

	const btnBoardsText = selectedBoard;
	const btnBoardsClass = 'text-l-heading dark:text-white';

	const btnAddTaskClass = `bg-purple py-2.5 px-5 rounded-full`;

	const toggleBoardsDropdown = () => {
		setIsAllBoardsOpen(!isAllBoardsOpen);
	};

	const openAddNewTaskModal = () => {
		setIsAddNewTaskModalOpen(true);
	};

	const handleKebabMenu = () => {
		setIsKebabModalOpen(!isKebabModalOpen);
	};

	const handleDeleteBoard = async (boardId: number) => {
		await deleteItem(() => deleteBoardById(boardId));
		setIsDeleteModalOpen(false);

		const newBoard = boards.length > 0 ? boards[0] : null;

		if (!newBoard) {
			console.error('No remaining boards.');
			return;
		}
		setSelectedBoard(newBoard.name);

		const urlSearchParams = new URLSearchParams(window.location.search);

		urlSearchParams.set('boardID', newBoard.board_id.toString());
		urlSearchParams.set('boardName', newBoard.name);

		window.history.pushState(null, '', `/?${urlSearchParams.toString()}`);

		setBoardId(Number(boardId));
	};

	return (
		<>
			<div className="bg-white dark:bg-dark-grey flex items-center justify-between h-16 px-4 fixed inset-0 z-40">
				<div className="flex gap-4">
					<LogoMobile />
					<div className="flex items-center gap-2">
						<Button
							onClick={toggleBoardsDropdown}
							buttonText={btnBoardsText}
							buttonClass={btnBoardsClass}
						/>
						{isAllBoardsOpen ? <ChevronDown /> : <ChevronUp />}
					</div>
				</div>
				<div className="flex items-center gap-4">
					<Button
						onClick={openAddNewTaskModal}
						svgComponent={<AddTaskMobile />}
						buttonClass={btnAddTaskClass}
					/>
					<div onClick={handleKebabMenu}>
						<KebabMenu />
					</div>
					{isKebabModalOpen ? (
						<KebabMenuModal
							editText={kebabMenuEdit}
							deleteText={kebabMenuDelete}
							menuPosition={kebabMenuPosition}
							setIsKebabMenuOpen={setIsKebabModalOpen}
							setIsDeleteModalOpen={setIsDeleteModalOpen}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			{isDeleteModalOpen ? (
				<DeleteModal
					onClick={() => handleDeleteBoard(boardId)}
					itemName={selectedBoard}
					parentComponent="Nav"
					setIsDeleteModalOpen={setIsDeleteModalOpen}
				/>
			) : (
				<></>
			)}
			{isAllBoardsOpen ? (
				<>
					<div className="fixed inset-0 bg-black opacity-50 z-30"></div>
					<AllBoards
						boards={boards}
						selectedBoard={selectedBoard}
						setSelectedBoard={setSelectedBoard}
						setIsAllBoardsOpen={setIsAllBoardsOpen}
						setIsAddNewBoardModalOpen={setIsAddNewBoardModalOpen}
					/>
				</>
			) : (
				<></>
			)}
			{isAddNewTaskModalOpen ? (
				<AddNewTaskModal setIsAddNewTaskModalOpen={setIsAddNewTaskModalOpen} />
			) : (
				<></>
			)}
			{isAddNewBoardkModalOpen ? (
				<AddNewBoardModal
					setIsAddNewBoardModalOpen={setIsAddNewBoardModalOpen}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default Nav;

import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import ChevronDown from '../SVGComponents/ChevronDown';
import { deleteBoardById } from '../../api/kanbanApi';
import AddTaskMobile from '../SVGComponents/AddTaskMobile';
import AllBoards from '../Boards/AllBoards';
import ChevronUp from '../SVGComponents/ChevronUp';
import { Board } from '../../interfaces/IBoard';
import AddNewTaskModal from '../Tasks/AddNewTaskModal';
import KebabMenuModal from '../KebabMenu/KebabMenuModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import useDelete from '../../hooks/useDelete';
import useBoardStore from '../../store/boardStore';
import Logo from '../SVGComponents/Logo';
import LogoMobile from '../SVGComponents/LogoMobile';
import { useQueryClient } from '@tanstack/react-query';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import KebabMenuIcon from '../SVGComponents/KebabMenuIcon';
import UserProfile from '../UserProfile/UserProfile';

interface NavPros {
	isAllBoardsOpen: boolean;
	setIsAllBoardsOpen: (arg: boolean) => void;
	boards: Board[];
	boardHasColumns: boolean;
	setIsAddNewBoardModalOpen: (arg: boolean) => void;
	setIsEditBoardModalOpen: (arg: boolean) => void;
}
const Nav = ({
	isAllBoardsOpen,
	setIsAllBoardsOpen,
	boards,
	boardHasColumns,
	setIsAddNewBoardModalOpen,
	setIsEditBoardModalOpen,
}: NavPros) => {
	const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
	const [isKebabMenuModalOpen, setIsKebabMenuModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const selectedBoard = useBoardStore((state) => state.selectedBoard);
	const setSelectedBoard = useBoardStore((state) => state.setSelectedBoard);

	const boardId = selectedBoard.board_id;

	const queryClient = useQueryClient();

	const kebabMenuEdit = 'Edit Board';
	const kebabMenuDelete = 'Delete Board';
	const kebabMenuPosition = 'top-16 right-4';

	const { width } = useWindowDimensions();
	const isMobile = width < 768;

	const { deleteItem } = useDelete();

	const firstBoard = boards[0] || {};

	useEffect(() => {
		if (!selectedBoard.name) {
			setSelectedBoard(firstBoard);
		}
	}, [firstBoard]);

	const btnBoardsText = selectedBoard.name || '';

	const btnBoardsClass = 'text-l-heading dark:text-white';

	const btnAddTaskClass = `bg-purple py-2.5 px-5 rounded-full text-white tablet:text-m-heading transition ease-in-out duration-300 ${
		boardHasColumns
			? 'enabled:hover:bg-purple-hover'
			: 'cursor-not-allowed opacity-75'
	}`;

	const btnAddTaskText = '+ Add New Task';

	const toggleBoardsDropdown = () => {
		setIsAllBoardsOpen(!isAllBoardsOpen);
	};

	const openAddNewTaskModal = () => {
		setIsAddNewTaskModalOpen(true);
	};

	const handleKebabMenu = () => {
		setIsKebabMenuModalOpen(!isKebabMenuModalOpen);
	};

	const handleDeleteBoard = async (boardId: number) => {
		await deleteItem(() => deleteBoardById(boardId));
		setIsDeleteModalOpen(false);

		const newBoard = boards.length > 0 ? boards[0] : null;

		if (!newBoard) {
			console.error('No remaining boards.');
			return;
		}

		setSelectedBoard(newBoard);

		setIsKebabMenuModalOpen(false);

		queryClient.invalidateQueries(['boards']);
	};

	return (
		<>
			<div className="bg-white dark:bg-dark-grey flex items-center justify-between h-16 px-4 sticky inset-0 z-40">
				<div className="flex items-center gap-4 tablet:gap-6 h-full">
					{isMobile ? <LogoMobile /> : <Logo />}
					<div className="hidden tablet:inline-block h-full tablet:border-r border-lines-light dark:border-lines-dark"></div>
					{isMobile ? (
						<div className="flex items-center gap-2">
							<Button
								onClick={toggleBoardsDropdown}
								buttonText={btnBoardsText}
								buttonClass={btnBoardsClass}
							/>
							{isAllBoardsOpen ? <ChevronDown /> : <ChevronUp />}
						</div>
					) : (
						<span
							className={`text-l-heading dark:text-white ${
								isAllBoardsOpen
									? 'transition-all ease-in-out duration-300 ml-16'
									: ''
							}`}
						>
							{selectedBoard.name}
						</span>
					)}
				</div>
				<UserProfile />
				<div className="flex items-center gap-4">
					<Button
						onClick={openAddNewTaskModal}
						svgComponent={<AddTaskMobile />}
						buttonClass={btnAddTaskClass}
						buttonText={btnAddTaskText}
						disabled={!boardHasColumns}
					/>
					<div onClick={handleKebabMenu} className="cursor-pointer">
						<KebabMenuIcon />
					</div>
					{isKebabMenuModalOpen ? (
						<KebabMenuModal
							editText={kebabMenuEdit}
							deleteText={kebabMenuDelete}
							menuPosition={kebabMenuPosition}
							setIsDeleteModalOpen={setIsDeleteModalOpen}
							setIsEditBoardModalOpen={setIsEditBoardModalOpen}
							isParentTaskModal={false}
							setIsKebabMenuModalOpen={setIsKebabMenuModalOpen}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			{isAllBoardsOpen ? (
				<>
					<div className="fixed inset-0 bg-black opacity-50 z-30 tablet:hidden"></div>
					<AllBoards
						boards={boards}
						isAllBoardsOpen={isAllBoardsOpen}
						setIsAllBoardsOpen={setIsAllBoardsOpen}
						setIsAddNewBoardModalOpen={setIsAddNewBoardModalOpen}
					/>
				</>
			) : (
				<></>
			)}
			{isDeleteModalOpen ? (
				<DeleteModal
					onClick={() => handleDeleteBoard(boardId)}
					itemName={selectedBoard.name}
					parentComponent="Nav"
					setIsDeleteModalOpen={setIsDeleteModalOpen}
				/>
			) : (
				<></>
			)}

			{isAddNewTaskModalOpen ? (
				<AddNewTaskModal setIsAddNewTaskModalOpen={setIsAddNewTaskModalOpen} />
			) : (
				<></>
			)}
		</>
	);
};

export default Nav;

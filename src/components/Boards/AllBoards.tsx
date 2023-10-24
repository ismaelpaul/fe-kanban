import React from 'react';
import LightTheme from '../SVGComponents/LightTheme';
import DarkTheme from '../SVGComponents/DarkTheme';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import { Board } from '../../interfaces/IBoard';
import BoardIcon from '../SVGComponents/BoardIcon';
import useBoardStore from '../../store/boardStore';
import Logo from '../SVGComponents/Logo';
import HideSidebarIcon from '../SVGComponents/HideSidebarIcon';

interface AllBoardsProps {
	boards: Board[];
	setIsAllBoardsOpen: (arg: boolean) => void;
	setIsAddNewBoardModalOpen: (arg: boolean) => void;
}
const AllBoards = ({
	boards,
	setIsAllBoardsOpen,
	setIsAddNewBoardModalOpen,
}: AllBoardsProps) => {
	const setBoardId = useBoardStore((state) => state.setBoardId);

	const selectedBoard = useBoardStore((state) => state.selectedBoard);
	const setSelectedBoard = useBoardStore((state) => state.setSelectedBoard);

	const btnAddTaskClass = 'fill-purple';

	const handleSelectBoard = (board: Board) => {
		const urlSearchParams = new URLSearchParams();
		urlSearchParams.set('boardName', board.name);
		urlSearchParams.set('boardID', board.board_id.toString());
		window.history.pushState(
			null,
			'',
			`/?boardName=${board.name}&boardID=${board.board_id}`
		);
		setBoardId(board.board_id);

		setSelectedBoard(board.name);
		setIsAllBoardsOpen(false);
	};

	const handleAddNewBoardModal = () => {
		setIsAddNewBoardModalOpen(true);
		setIsAllBoardsOpen(false);
	};

	return (
		<div className="bg-white dark:bg-dark-grey absolute tablet:fixed w-[16.5rem] top-20 ml-[3.375rem] rounded-lg py-[1.188rem] z-40 tablet:ml-0 tablet:top-0 tablet:py-0 tablet:h-screen tablet:border-r tablet:border-lines-light tablet:dark:border-lines-dark tablet:rounded-none">
			<div className="hidden tablet:inline-block pl-[1.625rem] pt-[1.2rem] mb-[3.375rem]">
				<Logo />
			</div>
			<span className="inline-block text-medium-grey text-12px font-semiBold tracking-2.4px mb-[1.188rem] pl-6">
				ALL BOARDS ({boards.length})
			</span>
			{boards.map((board: Board) => {
				const isSelected = selectedBoard === board.name;
				const iconClass = isSelected ? 'fill-white' : 'fill-purple';
				return (
					<React.Fragment key={board.board_id}>
						<div
							onClick={() => handleSelectBoard(board)}
							className={`flex items-center gap-3 h-12 text-m-heading pl-6 mr-6 rounded-e-full ${
								isSelected ? 'bg-purple' : ''
							}`}
						>
							<BoardIcon iconClass={iconClass} />
							<nav
								className={`${isSelected ? 'text-white' : 'text-medium-grey'}`}
							>
								{board.name}
							</nav>
						</div>
					</React.Fragment>
				);
			})}
			<div className="flex items-center gap-3 h-12 text-m-heading pl-6 text-purple">
				<BoardIcon iconClass={btnAddTaskClass} />
				<span onClick={handleAddNewBoardModal}> + Create New Board</span>
			</div>
			<div className="flex flex-col gap-4 mt-4 tablet:mt-44">
				<div className="bg-light-bg dark:bg-dark-bg flex items-center justify-center gap-6 h-12 rounded-md mt-4 mx-4">
					<LightTheme />
					<ToggleTheme />
					<DarkTheme />
				</div>
				<div
					onClick={() => {
						setIsAllBoardsOpen(false);
					}}
					className="hidden tablet:flex items-center gap-3 pl-6 w-60 h-12 rounded-e-full"
				>
					<HideSidebarIcon />
					<span className="text-m-heading text-medium-grey">Hide Sidebar</span>
				</div>
			</div>
		</div>
	);
};

export default AllBoards;

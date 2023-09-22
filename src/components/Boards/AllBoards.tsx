import React from 'react';
import LightTheme from '../SVGComponents/LightTheme';
import DarkTheme from '../SVGComponents/DarkTheme';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import { Board } from '../../interfaces/IBoard';
import BoardIcon from '../SVGComponents/BoardIcon';
import useBoardStore from '../../store/boardStore';

type AllBoardsProps = {
	boards: Board[];
	setSelectedBoard: React.Dispatch<React.SetStateAction<string>>;
	selectedBoard: string;
	setIsAllBoardsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const AllBoards = ({
	boards,
	selectedBoard,
	setSelectedBoard,
	setIsAllBoardsOpen,
}: AllBoardsProps) => {
	const setBoardId = useBoardStore((state) => state.setBoardId);
	const btnAddTaskClass = 'fill-purple';

	const handleSelectBoard = (board: Board) => {
		const urlSearchParams = new URLSearchParams();
		urlSearchParams.set('boardName', board.name);
		window.history.pushState(null, '', `/?boardName=${board.name}`);

		setBoardId(board.board_id);

		setSelectedBoard(board.name);
		setIsAllBoardsOpen(false);
	};

	return (
		<div className="bg-white dark:bg-dark-grey absolute w-[16.5rem] top-20 ml-[3.375rem] rounded-lg py-[1.188rem] z-50">
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
							<span
								className={`${isSelected ? 'text-white' : 'text-medium-grey'}`}
							>
								{board.name}
							</span>
						</div>
					</React.Fragment>
				);
			})}
			<div className="flex items-center gap-3 h-12 text-m-heading pl-6 text-purple">
				<BoardIcon iconClass={btnAddTaskClass} />
				<span> + Create New Board</span>
			</div>
			<div className="bg-light-bg dark:bg-dark-bg flex items-center justify-center gap-6 h-12 rounded-md mt-4 mx-4">
				<LightTheme />
				<ToggleTheme />
				<DarkTheme />
			</div>
		</div>
	);
};

export default AllBoards;

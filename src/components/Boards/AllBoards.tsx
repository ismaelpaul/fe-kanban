import React, { useState } from 'react';
import LightTheme from '../SVGComponents/LightTheme';
import DarkTheme from '../SVGComponents/DarkTheme';
import ToggleTheme from '../Toggle/ToggleTheme';
import { Board } from '../../interfaces/IBoard';
import BoardIcon from '../SVGComponents/BoardIcon';
import useBoardStore from '../../store/boardStore';
import Logo from '../SVGComponents/Logo';
import HideSidebarIcon from '../SVGComponents/HideSidebarIcon';
import { motion } from 'framer-motion';

interface AllBoardsProps {
	boards: Board[];
	isAllBoardsOpen: boolean;
	setIsAllBoardsOpen: (arg: boolean) => void;
	setIsAddNewBoardModalOpen: (arg: boolean) => void;
}
const AllBoards = ({
	boards,
	setIsAllBoardsOpen,
	setIsAddNewBoardModalOpen,
}: AllBoardsProps) => {
	const [isHovering, setIsHovering] = useState(-1);

	const setBoardId = useBoardStore((state) => state.setBoardId);

	const selectedBoard = useBoardStore((state) => state.selectedBoard);
	const setSelectedBoard = useBoardStore((state) => state.setSelectedBoard);

	const btnAddTaskClass = 'fill-purple';

	const handleSelectBoard = (board: Board) => {
		setBoardId(board.board_id);
		setSelectedBoard(board);
	};

	const handleAddNewBoardModal = () => {
		setIsAddNewBoardModalOpen(true);
		setIsAllBoardsOpen(false);
	};

	const handleMouseOver = (index: number) => {
		setIsHovering(index);
	};

	const handleMouseOut = () => {
		setIsHovering(-1);
	};

	return (
		<motion.div
			initial={{ transform: 'translateX(-10rem)' }}
			animate={{ transform: 'translateX(0)' }}
			transition={{ duration: 0.25 }}
			className={`
			
			bg-white dark:bg-dark-grey absolute tablet:fixed w-[16.5rem] top-20 ml-[3.375rem] rounded-lg py-[1.188rem] z-40 tablet:ml-0 tablet:top-0 tablet:py-0 tablet:h-screen tablet:border-r tablet:border-lines-light tablet:dark:border-lines-dark tablet:rounded-none`}
		>
			<div className="hidden tablet:inline-block pl-[1.625rem] pt-[1.2rem] mb-[3.375rem]">
				<Logo />
			</div>
			<span className="inline-block text-medium-grey text-12px font-semiBold tracking-2.4px mb-[1.188rem] pl-6">
				ALL BOARDS ({boards.length})
			</span>
			{boards.map((board: Board, index) => {
				const isSelected = selectedBoard.name === board.name;
				const boardIconClass = isSelected
					? 'transition ease-in-out duration-300 fill-white'
					: '';
				return (
					<React.Fragment key={board.board_id}>
						<div
							onMouseOut={handleMouseOut}
							onMouseOver={() => {
								handleMouseOver(index);
							}}
							onClick={() => handleSelectBoard(board)}
							className={`flex items-center gap-3 h-12 text-m-heading pl-6 mr-6 rounded-e-full cursor-pointer transition ease-in-out duration-300 hover:bg-purple/10 dark:hover:bg-white ${
								isSelected ? 'bg-purple pointer-events-none' : ''
							}`}
						>
							<BoardIcon
								iconClass={`${boardIconClass} ${
									isHovering === index
										? 'transition ease-in-out duration-300 fill-purple'
										: 'fill-medium-white'
								}`}
							/>
							<nav
								className={` ${
									isSelected ? 'text-white' : 'text-medium-grey'
								} ${
									isHovering === index
										? 'transition ease-in-out duration-300 text-purple'
										: ''
								}`}
							>
								{board.name}
							</nav>
						</div>
					</React.Fragment>
				);
			})}
			<div className="flex items-center gap-3 h-12 text-m-heading pl-6 cursor-pointer text-purple">
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
					onMouseEnter={() => setIsHovering(boards.length + 1)}
					onMouseLeave={() => setIsHovering(-1)}
					className="cursor-pointer hidden tablet:flex items-center gap-3 pl-6 w-60 h-12 rounded-e-full transition ease-in-out duration-300 hover:bg-purple/10 dark:hover:bg-white hover:text-purple"
				>
					<HideSidebarIcon
						iconClass={`${
							isHovering === boards.length + 1
								? 'transition ease-in-out duration-300 fill-purple'
								: 'fill-medium-grey'
						}`}
					/>
					<span
						className={`text-m-heading ${
							isHovering === boards.length + 1
								? 'transition ease-in-out duration-300 text-purple'
								: 'text-medium-grey'
						}`}
					>
						Hide Sidebar
					</span>
				</div>
			</div>
		</motion.div>
	);
};

export default AllBoards;

import { useState } from 'react';
import Button from './Button';
import ChevronDown from './SVGComponents/ChevronDown';
import { getAllBoards } from '../api/kanbanApi';
import { useQuery } from 'react-query';
import LogoMobile from './SVGComponents/LogoMobile';
import KebabMenu from './SVGComponents/KebabMenu';
import AddTaskMobile from './SVGComponents/AddTaskMobile';
import AllBoards from './AllBoards';
import ChevronUp from './SVGComponents/ChevronUp';

const Nav = () => {
	const [selectedBoard, setSelectedBoard] = useState('');
	const [isAllBoardsOpen, setIsAllBoardsOpen] = useState(false);

	const { isLoading, isError } = useQuery('boards', getAllBoards, {
		onSuccess: (data) => {
			setSelectedBoard(data.boards[0].name);
		},
	});

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	const btnText = selectedBoard;
	const btnBoardsClass = 'text-l-heading';

	const btnAddTaskClass = 'bg-purple py-2.5 px-5 rounded-full';

	const toggleBoardsDropdown = () => {
		setIsAllBoardsOpen(!isAllBoardsOpen);
	};

	return (
		<>
			<div className="flex items-center justify-between h-16 px-4">
				<div className="flex gap-4">
					<LogoMobile />
					<div className="flex items-center gap-2">
						<Button
							onClick={toggleBoardsDropdown}
							buttonText={btnText}
							buttonClass={btnBoardsClass}
						/>
						{isAllBoardsOpen ? <ChevronDown /> : <ChevronUp />}
					</div>
				</div>
				<div className="flex items-center gap-4">
					<Button
						svgComponent={<AddTaskMobile />}
						buttonClass={btnAddTaskClass}
					/>
					<KebabMenu />
				</div>
			</div>
			{isAllBoardsOpen ? (
				<>
					<div className="bg-black h-screen opacity-50"></div>
					<AllBoards />
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default Nav;

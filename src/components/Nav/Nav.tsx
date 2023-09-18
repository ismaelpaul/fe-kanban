import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import ChevronDown from '../SVGComponents/ChevronDown';
import { getAllBoards } from '../../api/kanbanApi';
import LogoMobile from '../SVGComponents/LogoMobile';
import KebabMenu from '../SVGComponents/KebabMenu';
import AddTaskMobile from '../SVGComponents/AddTaskMobile';
import AllBoards from '../Boards/AllBoards';
import ChevronUp from '../SVGComponents/ChevronUp';
import useFetch from '../../hooks/useFetch';
import { Boards } from '../../interfaces/IBoard';

const Nav = () => {
	const [selectedBoard, setSelectedBoard] = useState<string>('');
	const [isAllBoardsOpen, setIsAllBoardsOpen] = useState<boolean>(false);

	const { data, isLoading, isError } = useFetch({
		queryKey: 'boards',
		queryFn: getAllBoards,
	});

	const firstBoard = (data as { boards: { name: string }[] } | undefined)
		?.boards[0]?.name;

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const boardName = urlSearchParams.get('boardName') || firstBoard;

		if (boardName) {
			setSelectedBoard(boardName);
		}
	}, [firstBoard]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	const { boards }: Boards = data || { boards: [] };

	const btnBoardsText = selectedBoard;
	const btnBoardsClass = 'text-l-heading';

	const btnAddTaskClass = `bg-purple py-2.5 px-5 rounded-full`;

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
							buttonText={btnBoardsText}
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
					<AllBoards
						boards={boards}
						selectedBoard={selectedBoard}
						setSelectedBoard={setSelectedBoard}
						setIsAllBoardsOpen={setIsAllBoardsOpen}
					/>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default Nav;

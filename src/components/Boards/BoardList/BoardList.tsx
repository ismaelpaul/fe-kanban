import { useState, useCallback } from 'react';
import { BoardItem } from '../BoardItem';
import { useBoardStore } from '@/store/boards';
import { Board } from '@/interfaces/IBoard';

type BoardListPros = {
	boards: Board[];
};

const BoardList = ({ boards }: BoardListPros) => {
	const [hoverIndex, setHoverIndex] = useState(-1);

	const selectedBoard = useBoardStore((state) => state.selectedBoard);
	const setSelectedBoard = useBoardStore((state) => state.setSelectedBoard);

	const handleMouseOver = useCallback((index: number) => {
		setHoverIndex(index);
	}, []);

	const handleMouseOut = useCallback(() => {
		setHoverIndex(-1);
	}, []);

	const handleSelectBoard = useCallback(
		(board: Board) => {
			setSelectedBoard(board);
		},
		[setSelectedBoard]
	);

	return (
		<>
			{boards.map((board: Board, index: number) => {
				const isSelected = selectedBoard.name === board.name;
				const isHovering = hoverIndex === index;

				return (
					<BoardItem
						key={board.board_id}
						board={board}
						isSelected={isSelected}
						isHovering={isHovering}
						onMouseOver={() => handleMouseOver(index)}
						onMouseOut={handleMouseOut}
						onSelect={() => handleSelectBoard(board)}
					/>
				);
			})}
		</>
	);
};

export { BoardList };

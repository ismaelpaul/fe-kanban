import { Board } from '@/interfaces/IBoard';
import { useBoardStore } from '@/store/boards';
import { QueryClient } from '@tanstack/react-query';

type BoardAddedHandler = {
	type: string;
	board: Board;
};

export const boardAddedHandler = (
	data: BoardAddedHandler,
	queryClient: QueryClient
) => {
	const { setSelectedBoard } = useBoardStore.getState();

	const newBoard = data.board;

	setSelectedBoard(newBoard);

	const teamId = data.board.team_id;

	queryClient.invalidateQueries(['boards', teamId]);
};

import { Board } from '@/interfaces/IBoard';
import { QueryClient } from '@tanstack/react-query';

type BoardAddedHandler = {
	type: string;
	board: Board;
};

export const boardAddedHandler = (
	data: BoardAddedHandler,
	queryClient: QueryClient
) => {
	const teamId = data.board.team_id;

	queryClient.invalidateQueries(['boards', teamId]);
};

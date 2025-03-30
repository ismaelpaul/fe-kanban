import { Board } from '@/interfaces/IBoard';

import { QueryClient } from '@tanstack/react-query';

type BoardDeletedHandler = {
	type: string;
	deletedBoard: Board;
};

export const boardDeletedHandler = (
	data: BoardDeletedHandler,
	queryClient: QueryClient
) => {
	const teamId = data.deletedBoard.team_id;

	queryClient.invalidateQueries(['boards', teamId]);
};

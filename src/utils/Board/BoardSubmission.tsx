import { addNewBoard } from '../../api/kanbanApi';
import { BoardSubmit } from '../../interfaces/IBoard';

export const addNewBoardSubmission = async (
	newBoardData: Partial<BoardSubmit>,
	setBoardId: (id: number) => void,
	setSelectedBoard: (board: string) => void
) => {
	const response = await addNewBoard(newBoardData);

	setSelectedBoard(response.board.name);
	setBoardId(response.board.board_id);
};

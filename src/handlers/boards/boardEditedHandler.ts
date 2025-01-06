import { Board } from '@/interfaces/IBoard';
import { SingleColumn } from '@/interfaces/IColumn';
import { useBoardStore } from '@/store/boards';
import { QueryClient } from '@tanstack/react-query';

type BoardEditedHandler = {
	type: string;
	board: Board;
	columns: SingleColumn[];
};

export const boardEditedHandler = (
	data: BoardEditedHandler,
	queryClient: QueryClient
) => {
	const { selectedBoard, setSelectedBoard } = useBoardStore.getState();

	const editedBoard = data.board;

	const editedColumns = data.columns;

	if (editedBoard && Object.keys(editedBoard).length > 0) {
		setSelectedBoard(editedBoard);
	}

	if (editedColumns.length > 0) {
		const boardId = selectedBoard.board_id;
		queryClient.invalidateQueries(['columns', boardId]);
	}
};

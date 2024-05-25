import { Board } from './IBoard';

export interface BoardStoreState {
	boardId: number;
	selectedBoard: Board;
}

export interface BoardStoreActions {
	setBoardId: (newBoardId: number) => void;
	setSelectedBoard: (newSelectedBoard: Board) => void;
}

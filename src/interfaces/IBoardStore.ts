import { Board } from './IBoard';

export interface BoardStoreState {
	selectedBoard: Board;
}

export interface BoardStoreActions {
	setSelectedBoard: (newSelectedBoard: Board) => void;
}

export interface BoardStoreState {
	boardId: number;
}

export interface BoardStoreActions {
	setBoardId: (newBoardId: number) => void;
}

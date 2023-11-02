export interface BoardStoreState {
	boardId: number;
	selectedBoard: string;
}

export interface BoardStoreActions {
	setBoardId: (newBoardId: number) => void;
	setSelectedBoard: (newSelectedBoard: string) => void;
}

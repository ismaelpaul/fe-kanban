import { create } from 'zustand';
import { BoardStoreActions, BoardStoreState } from '../interfaces/IBoardStore';
import { Board } from '../interfaces/IBoard';

const useBoardStore = create<BoardStoreState & BoardStoreActions>((set) => ({
	boardId: 1,
	setBoardId: (newBoardId: number) => set({ boardId: newBoardId }),
	selectedBoard: { user_id: 0, board_id: 0, name: '' },
	setSelectedBoard: (newSelectedBoard: Board) =>
		set({ selectedBoard: newSelectedBoard }),
}));

export default useBoardStore;

import { create } from 'zustand';
import { BoardStoreActions, BoardStoreState } from '../interfaces/IBoardStore';

const useBoardStore = create<BoardStoreState & BoardStoreActions>((set) => ({
	boardId: 1,
	setBoardId: (newBoardId: number) => set({ boardId: newBoardId }),
	selectedBoard: '',
	setSelectedBoard: (newSelectedBoard: string) =>
		set({ selectedBoard: newSelectedBoard }),
}));

export default useBoardStore;

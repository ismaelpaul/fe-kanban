import { create } from 'zustand';
import { BoardStoreActions, BoardStoreState } from '../interfaces/IBoardStore';

const useBoardStore = create<BoardStoreState & BoardStoreActions>((set) => ({
	boardId: 0,
	setBoardId: (newBoardId: number) => set({ boardId: newBoardId }),
}));

export default useBoardStore;

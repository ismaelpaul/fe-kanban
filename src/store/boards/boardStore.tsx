import { create } from 'zustand';

import { Board } from '@/interfaces/IBoard';
import { BoardStoreActions, BoardStoreState } from '@/interfaces/IBoardStore';

const useBoardStore = create<BoardStoreState & BoardStoreActions>((set) => ({
	selectedBoard: { user_id: 0, board_id: 0, name: '' },
	setSelectedBoard: (newSelectedBoard: Board) =>
		set({ selectedBoard: newSelectedBoard }),
}));

export { useBoardStore };

import { create } from 'zustand';

import { Board } from '@/interfaces/IBoard';
import { BoardStoreActions, BoardStoreState } from '@/interfaces/IBoardStore';

const useBoardStore = create<BoardStoreState & BoardStoreActions>((set) => ({
	selectedBoard: { board_id: 0, name: '', team_id: 0 },
	setSelectedBoard: (newSelectedBoard: Board) =>
		set({ selectedBoard: newSelectedBoard }),
}));

export { useBoardStore };

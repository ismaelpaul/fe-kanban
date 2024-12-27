import { create } from 'zustand';

import { SingleColumn } from '@/interfaces/IColumn';
import {
	ColumnsStoreActions,
	ColumnsStoreState,
} from '@/interfaces/IColumnStore';

const useColumnsStore = create<ColumnsStoreState & ColumnsStoreActions>(
	(set) => ({
		columns: [],
		setColumns: (newColumns: SingleColumn[]) => set({ columns: newColumns }),
	})
);

export { useColumnsStore };

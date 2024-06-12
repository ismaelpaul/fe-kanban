import { create } from 'zustand';
import {
	ColumnsStoreActions,
	ColumnsStoreState,
} from '../interfaces/IColumnStore';
import { SingleColumn } from '../interfaces/IColumn';

const useColumnsStore = create<ColumnsStoreState & ColumnsStoreActions>(
	(set) => ({
		columns: [],
		setColumns: (newColumns: SingleColumn[]) => set({ columns: newColumns }),
	})
);

export default useColumnsStore;

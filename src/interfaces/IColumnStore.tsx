import { SingleColumn } from './IColumn';

export interface ColumnsStoreState {
	columns: SingleColumn[];
}

export interface ColumnsStoreActions {
	setColumns: (columns: SingleColumn[]) => void;
}

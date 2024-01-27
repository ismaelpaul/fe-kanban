import { IColumns } from './IColumn';

export interface ColumnsStoreState {
	columns: IColumns;
}

export interface ColumnsStoreActions {
	setColumns: (columns: IColumns) => void;
}

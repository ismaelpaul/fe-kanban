export interface SingleColumn {
	column_id: number;
	board_id: number;
	name: string;
}

export interface IColumns {
	columns: SingleColumn[];
}

export interface ColumnName {
	name: string;
}

export interface ColumnsInput {
	placeholder?: string;
	column_id?: number;
	name: string;
	is_new?: boolean;
}

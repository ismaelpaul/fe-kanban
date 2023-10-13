export interface SingleColumn {
	column_id: number;
	board_id: number;
	name: string;
}

export interface IColumns {
	columns: SingleColumn[];
}

export interface ColumnName {
	column_name: string;
}

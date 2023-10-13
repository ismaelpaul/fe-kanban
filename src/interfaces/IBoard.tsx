import { ColumnName } from './IColumn';

export interface Board {
	board_id: number;
	user_id: number;
	name: string;
}
export interface Boards {
	boards: Board[];
}

export interface BoardSubmit {
	user_id: number;
	board_name: string;
	columns?: ColumnName[];
}

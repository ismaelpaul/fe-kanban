import { ColumnsInput } from './IColumn';

export interface Board {
	board_id: number;
	name: string;
	team_id: number;
}
export interface Boards {
	boards: Board[];
}

export interface BoardSubmit {
	user_id: number;
	board_id: number;
	name: string;
	columns: ColumnsInput[];
}

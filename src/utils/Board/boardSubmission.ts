import { BoardSubmit } from '../../interfaces/IBoard';
import { ColumnsInput } from '../../interfaces/IColumn';
import { IToastTypes } from '../../interfaces/IToast';
import { getNewItemsToAdd } from '../utils';

type Payload = {
	type: string;
	payload: {
		board: {
			board_id: number;
			name: string;
		};
		columns: {
			toAdd: Array<Partial<ColumnsInput>>;
			toEdit: Array<{ column_id: number; name: string }>;
			toDelete: number[];
		};
	};
};

export const editBoardSubmission = async (
	newBoardData: Partial<BoardSubmit>,
	boardData: Partial<BoardSubmit> | undefined,
	columnsToDelete: number[],
	boardId: number,
	toast: IToastTypes
) => {
	if (!boardData) {
		toast.error('Something went wrong, please try again.');
		return null;
	}

	let boardHasChanges: boolean = false;

	const payload: Payload = {
		type: 'UPDATE_BOARD_INFO',
		payload: {
			board: { board_id: boardId, name: '' },
			columns: { toAdd: [], toEdit: [], toDelete: [] },
		},
	};

	if (newBoardData.name !== boardData?.name) {
		payload.payload.board.name = newBoardData.name ?? '';
		boardHasChanges = true;
	}

	const columns = boardData?.columns;
	const newColumns = newBoardData.columns;

	const columnsHaveChanges = compareColumns(columns, newColumns);

	if (columnsHaveChanges) {
		// Delete columns
		if (columnsToDelete.length > 0) {
			payload.payload.columns.toDelete = columnsToDelete;
		}

		// Edit columns
		const columnsToEdit = getEditedColumns(columns, newColumns);

		if (columnsToEdit.length > 0) {
			payload.payload.columns.toEdit = columnsToEdit;
		}

		// Add new columns
		const newColumnsToAdd = getNewItemsToAdd<ColumnsInput>(newColumns || []);

		if (newColumnsToAdd.length > 0) {
			payload.payload.columns.toAdd = newColumnsToAdd.map(
				(column: ColumnsInput) => {
					delete column.placeholder;
					delete column.is_new;
					return column;
				}
			);
		}
	}

	if (!boardHasChanges && !columnsHaveChanges) {
		return null;
	}

	return payload;
};

const getEditedColumns = (
	columns: ColumnsInput[] | undefined,
	newColumns: ColumnsInput[] | undefined
) => {
	const columnsToEdit: ColumnsInput[] = [];

	const columnsArray = columns ?? [];
	const newColumnsArray = newColumns ?? [];

	if (columnsArray.length === newColumnsArray.length) {
		for (let i = 0; i < columnsArray.length; i++) {
			if (
				columnsArray[i].name !== newColumnsArray[i].name &&
				!newColumnsArray[i].is_new
			) {
				columnsToEdit.push(newColumnsArray[i]);
			}
		}
	} else {
		for (let i = 0; i < columnsArray.length; i++) {
			for (let j = 0; j < newColumnsArray.length; j++) {
				if (columnsArray[i].column_id === newColumnsArray[j].column_id) {
					if (
						columnsArray[i].name !== newColumnsArray[j].name &&
						!newColumnsArray[i].is_new
					) {
						columnsToEdit.push(newColumnsArray[j]);
					}
				}
			}
		}
	}

	return columnsToEdit;
};

function compareColumns(
	columns: ColumnsInput[] | undefined,
	newColumns: ColumnsInput[] | undefined
) {
	const columnsArray = columns ?? [];
	const newColumnsArray = newColumns ?? [];

	if (columnsArray.length !== newColumnsArray.length) {
		return true;
	}

	for (let i = 0; i < columnsArray.length; i++) {
		if (columnsArray[i].name !== newColumnsArray[i].name) {
			return true;
		}
	}

	return false;
}

import { QueryClient } from '@tanstack/react-query';
import {
	addNewBoard,
	addNewColumnsByBoardId,
	deleteColumnsById,
	updateBoardNameById,
	updateColumnsByBoardId,
} from '../../api/kanbanApi';
import { Board, BoardSubmit } from '../../interfaces/IBoard';
import { ColumnsInput } from '../../interfaces/IColumn';
import { IToastTypes } from '../../interfaces/IToast';
import { getNewItemsToAdd } from '../utils';

export const addNewBoardSubmission = async (
	newBoardData: Partial<BoardSubmit>,
	setSelectedBoard: (board: Board) => void,
	queryClient: QueryClient,
	toast: IToastTypes
) => {
	const response = await addNewBoard(newBoardData);

	const newBoard = response.board;

	setSelectedBoard(newBoard);

	toast.success(`${newBoard.name} has been added.`);

	queryClient.invalidateQueries(['boards']);
};

export const editBoardSubmission = async (
	newBoardData: Partial<BoardSubmit>,
	boardData: Partial<BoardSubmit> | undefined,
	columnsToDelete: number[],
	setColumnsToDelete: (arg: number[]) => void,
	setSelectedBoard: (board: Board) => void,
	queryClient: QueryClient,
	boardId: number,
	toast: IToastTypes
) => {
	if (!boardData) {
		toast.error('Something went wrong, please try again.');
		return;
	}

	if (newBoardData.name !== boardData?.name) {
		const updatedBoard = { name: newBoardData.name };

		const response = await updateBoardNameById(boardId, updatedBoard);

		const urlSearchParams = new URLSearchParams();
		urlSearchParams.set('boardName', response.name);
		window.history.pushState(
			null,
			'',
			`/?boardName=${response.name}&boardID=${response.board_id}`
		);

		setSelectedBoard(response);

		queryClient.invalidateQueries(['boards']);
	}

	const columns = boardData?.columns;
	const newColumns = newBoardData.columns;

	const columnsHaveChanges = compareColumns(columns, newColumns);

	if (columnsHaveChanges) {
		// Delete columns
		if (columnsToDelete.length > 0) {
			await deleteColumnsById(columnsToDelete);
			setColumnsToDelete([]);
		}

		// Edit columns
		const columnsToEdit = getEditedColumns(columns, newColumns);

		if (columnsToEdit.length > 0) {
			await updateColumnsByBoardId(boardId, columnsToEdit);
		}

		// Add new columns
		const newColumnsToAdd = getNewItemsToAdd<ColumnsInput>(newColumns || []);

		if (newColumnsToAdd.length > 0) {
			newColumnsToAdd.forEach((column: ColumnsInput) => {
				delete column.placeholder;
				delete column.is_new;
			});
			await addNewColumnsByBoardId(boardId, newColumnsToAdd);
		}
	}
	queryClient.invalidateQueries(['columns', boardId]);
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

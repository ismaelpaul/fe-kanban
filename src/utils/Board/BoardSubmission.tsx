import { QueryClient } from '@tanstack/react-query';
import {
	addNewBoard,
	addNewColumnsByBoardId,
	deleteColumnsById,
	updateBoardNameById,
	updatedColumnsByBoardId,
} from '../../api/kanbanApi';
import { Board, BoardSubmit } from '../../interfaces/IBoard';
import { ColumnsInput, SingleColumn } from '../../interfaces/IColumn';
import { IToast } from '../../interfaces/IToast';
import { getNewItemsToAdd } from '../utils';

export const addNewBoardSubmission = async (
	newBoardData: Partial<BoardSubmit>,
	setBoardId: (id: number) => void,
	setSelectedBoard: (board: Board) => void,
	queryClient: QueryClient,
	toast: IToast
) => {
	console.log(newBoardData);

	const response = await addNewBoard(newBoardData);

	const newBoard = response.board;

	setSelectedBoard(newBoard);
	setBoardId(newBoard.board_id);

	toast.success(`${newBoard.name} has been added.`);

	const urlSearchParams = new URLSearchParams(window.location.search);

	urlSearchParams.set('boardID', response.board.board_id.toString());
	urlSearchParams.set('boardName', response.board.name);
	window.history.pushState(
		null,
		'',
		`/?boardName=${newBoard.name}&boardID=${newBoard.board_id}`
	);

	queryClient.invalidateQueries(['boards']);
};

export const editBoardSubmission = async (
	newBoardData: Partial<BoardSubmit>,
	boardData: Partial<BoardSubmit>,
	columnsToDelete: number[],
	setColumnsToDelete: (arg: number[]) => void,
	setSelectedBoard: (board: Board) => void,
	queryClient: QueryClient,
	boardId: number
) => {
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

	const columnsHaveChanges = compareArrays(columns, newColumns);

	if (columnsHaveChanges) {
		// Delete columns
		if (columnsToDelete.length > 0) {
			await deleteColumnsById(columnsToDelete);
			setColumnsToDelete([]);
		}

		// Edit columns
		const columnsToEdit = getEditedColumns(columns, newColumns);

		if (columnsToEdit.length > 0) {
			await updatedColumnsByBoardId(boardId, columnsToEdit);
		}

		// Add new columns
		const newColumnsToAdd = getNewItemsToAdd<ColumnsInput>(newColumns || []);

		if (newColumnsToAdd.length > 0) {
			newColumnsToAdd.forEach((column: ColumnsInput) => {
				delete column.placeholder;
				delete column.column_id;
				delete column.is_new;
			});
			await addNewColumnsByBoardId(boardId, newColumnsToAdd);
		}
	}
	queryClient.invalidateQueries(['columns', boardId]);
};

const getEditedColumns = (
	columns: SingleColumn[],
	newColumns: ColumnsInput[]
) => {
	const columnsToEdit = [];
	if (columns.length === newColumns.length) {
		for (let i = 0; i < columns.length; i++) {
			if (columns[i].name !== newColumns[i].name && !newColumns[i].is_new) {
				columnsToEdit.push(newColumns[i]);
			}
		}
	} else {
		for (let i = 0; i < columns.length; i++) {
			for (let j = 0; j < newColumns.length; j++) {
				if (columns[i].column_id === newColumns[j].column_id) {
					if (columns[i].name !== newColumns[j].name && !newColumns[i].is_new) {
						columnsToEdit.push(newColumns[j]);
					}
				}
			}
		}
	}
	return columnsToEdit;
};

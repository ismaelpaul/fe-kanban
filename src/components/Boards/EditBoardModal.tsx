import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import Cross from '../SVGComponents/Cross';
import Button from '../Button/Button';
import { useQueryClient } from '@tanstack/react-query';
import useBoardStore from '../../store/boardStore';
import { IColumns } from '../../interfaces/IColumn';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BoardSubmit } from '../../interfaces/IBoard';
import { SubmitHandler, useForm } from 'react-hook-form';
import usePatch from '../../hooks/usePatch';
import { updateBoardAndColumns } from '../../api/kanbanApi';

interface EditBoardModalProps {
	setIsEditBoardModalOpen: (arg: boolean) => void;
}

const EditBoardModal = ({ setIsEditBoardModalOpen }: EditBoardModalProps) => {
	const [columnsInput, setColumnsInput] = useState([
		{ column_id: 0, column_name: '' },
	]);

	const boardId = useBoardStore((state) => state.boardId);

	const selectedBoard = useBoardStore((state) => state.selectedBoard);
	const setSelectedBoard = useBoardStore((state) => state.setSelectedBoard);

	const queryClient = useQueryClient();

	const queryKey = ['columns', boardId];

	const { columns }: IColumns = queryClient.getQueryData(queryKey) || {
		columns: [],
	};

	useEffect(() => {
		setColumnsInput(
			columns.map((column) => {
				return { column_id: column.column_id, column_name: column.name };
			})
		);
	}, [columns]);

	const { patch } = usePatch();

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsEditBoardModalOpen(false));

	const addInputField = () => {
		const newInputFields = [...columnsInput];
		newInputFields.push({ column_id: 0, column_name: 'e.g. New Column' });
		setColumnsInput(newInputFields);
	};

	const removeInputField = (idxToRemove: number) => {
		const updatedInputs = columnsInput.filter((_, idx) => idx !== idxToRemove);
		setColumnsInput(updatedInputs);
	};

	const labelClass = 'text-body text-medium-grey dark:text-white font-bold';
	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full focus:outline-purple';

	const btnAddColumnClass =
		'bg-purple bg-opacity-10 dark:bg-white dark:bg-opacity-100 text-purple text-13px font-bold py-2 w-full rounded-full';
	const btnAddColumnText = '+ Add New Column';

	const btnEditBoardClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full mt-6';
	const btnEditBoardText = 'Save Changes';

	const errorClass = 'text-red text-l-body absolute right-[3.4rem] mt-[2.2rem]';
	const columnErrorClass = 'text-red text-l-body absolute right-[5.4rem]';

	const columnSchema = z.object({
		column_id: z.number().optional(),
		column_name: z.string().max(50).nonempty({ message: "Can't be empty" }),
	});

	const boardAndColumnsSchema = z.object({
		board_id: z.number().optional(),
		board_name: z.string().max(50).nonempty({ message: "Can't be empty" }),
		columns: z.array(columnSchema),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm<BoardSubmit>({
		resolver: zodResolver(boardAndColumnsSchema),
		defaultValues: {
			board_name: selectedBoard,
			columns: [],
		},
	});

	const submitData: SubmitHandler<BoardSubmit> = async (data: BoardSubmit) => {
		const updatedData: Partial<BoardSubmit> = {};

		updatedData.board_id = boardId;

		if (data.board_name !== selectedBoard) {
			updatedData.board_name = data.board_name;
		} else {
			updatedData.board_name = '';
		}

		updatedData.columns = data.columns?.map((column, idx) => {
			const defaultValue = columnsInput[idx].column_name;
			const columnId = columnsInput[idx].column_id;

			if (column.column_name !== defaultValue) {
				return { column_id: columnId, ...column };
			} else {
				return { column_id: columnId, column_name: '' };
			}
		});

		const queryKey = 'boards';

		const response = await patch({
			patchFn: updateBoardAndColumns,
			resourceId: boardId,
			updatedData,
			queryKey,
		});

		const urlSearchParams = new URLSearchParams();
		urlSearchParams.set('boardName', response.board.name);
		window.history.pushState(
			null,
			'',
			`/?boardName=${response.board.name}&boardID=${boardId}`
		);

		setSelectedBoard(response.board.name);

		queryClient.invalidateQueries(['columns', boardId]);

		setIsEditBoardModalOpen(false);

		reset();
	};

	const onSubmit = handleSubmit(submitData);

	useEffect(() => {
		columnsInput.forEach((input, idx) => {
			const columnNameKey =
				`columns[${idx}].column_name` as `columns.${number}.column_name`;
			setValue(columnNameKey, input.column_name);
		});
	}, [columnsInput, setValue]);

	return (
		<div className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div
				className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-4 w-screen tablet:mx-0 tablet:w-[30rem]"
				ref={modalRef}
			>
				<h1 className="text-l-heading mb-6 dark:text-white">Edit Board</h1>
				<form id="editBoardForm" onSubmit={onSubmit}>
					<div className="flex flex-col gap-2 mb-6">
						<label htmlFor="board_name" className={labelClass}>
							Board Name
						</label>
						<input
							id="board_name"
							{...register('board_name')}
							name="board_name"
							type="text"
							className={inputClass}
							defaultValue={selectedBoard}
						/>
						{errors.board_name && (
							<span className={errorClass}>{errors.board_name.message}</span>
						)}
					</div>
					<label className={`${labelClass} inline-block mb-2`}>
						Board Columns
					</label>
					{columnsInput.map((input, idx) => {
						const columnNameKey =
							`columns[${idx}].column_name` as keyof BoardSubmit;
						return (
							<div key={idx} className="flex items-center gap-4 mb-3">
								<input
									{...register(columnNameKey)}
									name={`columns[${idx}].column_name`}
									className={inputClass}
									defaultValue={input.column_name}
								/>
								{errors.columns?.[idx]?.column_name && (
									<span className={columnErrorClass}>
										{errors.columns?.[idx]?.column_name?.message}
									</span>
								)}
								<div onClick={() => removeInputField(idx)}>
									<Cross />
								</div>
							</div>
						);
					})}
					<Button
						buttonClass={btnAddColumnClass}
						buttonText={btnAddColumnText}
						onClick={addInputField}
						type="button"
					/>
					<Button
						buttonClass={btnEditBoardClass}
						buttonText={btnEditBoardText}
						type="submit"
					/>
				</form>
			</div>
		</div>
	);
};

export default EditBoardModal;

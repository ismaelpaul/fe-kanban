import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '../Input/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { BoardSubmit } from '../../interfaces/IBoard';
import { BoardSubmitSchema } from '../../models/Board';
import Cross from '../SVGComponents/Cross';
import {
	addNewBoardSubmission,
	editBoardSubmission,
} from '../../utils/Board/boardSubmission.ts';
import useBoardStore from '../../store/boardStore';
import { ColumnsInput } from '../../interfaces/IColumn';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../hooks/useToast';
import { IToastTypes } from '../../interfaces/IToast';

interface BoardFormProps {
	setIsAddNewBoardModalOpen?: (arg: boolean) => void;
	setIsEditBoardModalOpen?: (arg: boolean) => void;
	isNewBoard: boolean;
	boardData?: Partial<BoardSubmit>;
}

const BoardForm = ({
	boardData,
	setIsAddNewBoardModalOpen,
	setIsEditBoardModalOpen,
	isNewBoard,
}: BoardFormProps) => {
	const [columnsInput, setColumnsInput] = useState<ColumnsInput[]>([]);
	const [columnsToDelete, setColumnsToDelete] = useState<number[]>([]);

	const boardId = useBoardStore((state) => state.boardId);
	const setBoardId = useBoardStore((state) => state.setBoardId);
	const setSelectedBoard = useBoardStore((state) => state.setSelectedBoard);

	const queryClient = useQueryClient();

	const toast = useToast();

	const labelClass = 'text-body text-medium-grey dark:text-white font-bold';
	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';
	const errorClass = 'text-red text-l-body absolute';

	const btnAddColumnClass =
		'bg-purple bg-opacity-10 dark:bg-white dark:bg-opacity-100 text-purple text-13px font-bold py-2 mb-6 w-full rounded-full hover:bg-purple/25';
	const btnAddColumnText = '+ Add New Column';

	const addInputField = () => {
		const newId = columnsInput.length + 1;
		const newColumn = {
			column_id: newId,
			name: '',
			placeholder: 'e.g. New Column',
			is_new: true,
		};

		setColumnsInput((prevColumnsInput) => {
			const updatedColumns: ColumnsInput[] = [...prevColumnsInput, newColumn];

			// Update form values and trigger revalidation
			setValue(`columns.${updatedColumns.length - 1}`, newColumn);

			return updatedColumns;
		});
	};

	const removeInputField = (
		idxToRemove: number,
		columnId: number,
		toast: IToastTypes
	) => {
		if (!isNewBoard) {
			toast.warning(
				'Removing columns will also remove its related info such as tasks and subtasks'
			);
		}
		setColumnsToDelete([...columnsToDelete, columnId]);

		setColumnsInput((prevState) =>
			prevState.filter((_, idx) => idx !== idxToRemove)
		);

		// Update form values and trigger revalidation
		setValue(
			'columns',
			columnsInput.filter((_, idx) => idx !== idxToRemove)
		);
	};

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<BoardSubmit>({
		resolver: zodResolver(BoardSubmitSchema),
	});

	const submitData: SubmitHandler<BoardSubmit> = async (newBoardData) => {
		if (isNewBoard) {
			await addNewBoardSubmission(
				newBoardData,
				setBoardId,
				setSelectedBoard,
				queryClient,
				toast
			);
			setIsAddNewBoardModalOpen!(false);
		} else {
			await editBoardSubmission(
				newBoardData,
				boardData,
				columnsToDelete,
				setColumnsToDelete,
				setSelectedBoard,
				queryClient,
				boardId,
				toast
			);
			setIsEditBoardModalOpen!(false);
		}

		reset();
	};

	const onSubmit = handleSubmit(submitData);

	useEffect(() => {
		if (boardData?.columns) {
			setColumnsInput(boardData.columns);
			setValue('name', boardData.name || '');
		} else {
			setColumnsInput([
				{ column_id: 1, name: '', placeholder: 'eg. Todo' },
				{ column_id: 2, name: '', placeholder: 'eg. Doing' },
			]);
		}
	}, [boardData?.columns, setValue, boardData?.name]);

	return (
		<>
			<form id="board-form" onSubmit={onSubmit}>
				<div className="flex flex-col gap-2 mb-6 relative">
					<label htmlFor="board_name" className={labelClass}>
						Board Name
					</label>
					<TextInput
						register={register}
						name="name"
						className={`${inputClass} ${
							errors.name ? 'border border-red/100' : ''
						}`}
						placeholder={'e.g. Web Design'}
						defaultValue={boardData?.name}
					/>
					{errors.name && (
						<span className={`${errorClass} right-6 mt-[2.2rem]`}>
							{errors.name.message}
						</span>
					)}
				</div>
				<div>
					<label className={`${labelClass} inline-block mb-2`}>
						Board Columns
					</label>
					{columnsInput.map((column, idx) => {
						return (
							<div key={idx} className="flex items-center gap-4 mb-3 relative">
								<input
									{...register(`columns.${idx}.column_id`, {
										valueAsNumber: true,
									})}
									defaultValue={Number(column.column_id)}
									type="hidden"
								/>
								<TextInput
									register={register}
									name={`columns.${idx}.name`}
									className={`${inputClass} ${
										errors.columns?.[idx] ? 'border border-red/100' : ''
									}`}
									placeholder={column.placeholder}
									defaultValue={column.name}
								/>
								{errors.columns && (
									<span className={`${errorClass} right-14`}>
										{errors.columns[idx]?.name?.message}
									</span>
								)}
								<div
									onClick={() => removeInputField(idx, column.column_id, toast)}
								>
									<Cross isError={errors.columns?.[idx] != null} />
								</div>
							</div>
						);
					})}
				</div>
				<Button
					onClick={addInputField}
					type={'button'}
					buttonClass={btnAddColumnClass}
					buttonText={btnAddColumnText}
				/>
			</form>
		</>
	);
};

export default BoardForm;

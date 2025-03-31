import { useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BoardSubmit } from '@/interfaces/IBoard';
import { ColumnsInput } from '@/interfaces/IColumn';
import { IToastTypes } from '@/interfaces/IToast';

import { useBoardStore } from '@/store/boards';
import { useTeamsStore } from '@/store/teams';
import { useModalStore } from '@/store/modals';

import { useToast, useWebSocket } from '@/hooks';

import { BoardSubmitSchema } from '@/models/Board';

import { editBoardSubmission } from '@/utils/Board/boardSubmission';

import { TextInput } from '@/components/Input/TextInput';
import { Cross } from '@/components/SVGComponents/Cross';
import { Button } from '@/components/Button/Button';
import { InputField } from '@/components/InputField';

interface BoardFormProps {
	isNewBoard: boolean;
	boardData?: Partial<BoardSubmit>;
}

const BoardForm = ({ boardData, isNewBoard }: BoardFormProps) => {
	const [columnsInput, setColumnsInput] = useState<ColumnsInput[]>([]);
	const [columnsToDelete, setColumnsToDelete] = useState<number[]>([]);

	const { closeModal } = useModalStore();

	const { sendMessage } = useWebSocket();

	const selectedBoard = useBoardStore((state) => state.selectedBoard);

	const selectedTeam = useTeamsStore((state) => state.selectedTeam);

	const boardId = selectedBoard.board_id;

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
			const payload = {
				type: 'ADD_NEW_BOARD',
				payload: {
					board: newBoardData,
					team_id: selectedTeam.team_id,
				},
			};

			sendMessage(payload.type, payload.payload);

			closeModal('addNewBoardModal');
		} else {
			const payload = await editBoardSubmission(
				newBoardData,
				boardData,
				columnsToDelete,
				boardId,
				toast
			);
			if (payload && Object.keys(payload).length > 0) {
				sendMessage(payload.type, payload.payload);
			}

			closeModal('editBoardModal');
		}

		reset();
	};

	const onSubmit = handleSubmit(submitData);

	const initializeBoardData = () => {
		if (boardData?.columns) {
			setColumnsInput(boardData.columns);
			setValue('name', boardData.name || '');
		} else {
			setColumnsInput([
				{ column_id: 1, name: '', placeholder: 'eg. Todo' },
				{ column_id: 2, name: '', placeholder: 'eg. Doing' },
			]);
		}
	};

	useEffect(() => {
		initializeBoardData();
	}, [boardData?.columns, setValue, boardData?.name]);

	return (
		<>
			<form id="board-form" onSubmit={onSubmit}>
				<InputField
					register={register}
					name="name"
					label="Board Name"
					placeholder="e.g. Web Design"
					defaultValue={boardData?.name}
					errors={errors.name}
					type="text"
				/>
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

export { BoardForm };

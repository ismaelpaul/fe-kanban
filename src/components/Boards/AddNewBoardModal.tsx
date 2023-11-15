import { useRef, useState } from 'react';
import Button from '../Button/Button';
import useClickOutside from '../../hooks/useClickOutside';
import Cross from '../SVGComponents/Cross';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BoardSubmit } from '../../interfaces/IBoard';
import useUserStore from '../../store/userStore';
import { addNewBoard } from '../../api/kanbanApi';
import useBoardStore from '../../store/boardStore';

interface AddNewBoardModalProps {
	setIsAddNewBoardModalOpen: (arg: boolean) => void;
}

const AddNewBoardModal = ({
	setIsAddNewBoardModalOpen,
}: AddNewBoardModalProps) => {
	const [columnsInput, setColumnsInput] = useState([
		{ id: 1, placeholder: 'e.g. Todo' },
		{ id: 2, placeholder: 'e.g. Doing' },
	]);
	const userId = useUserStore((state) => state.userId);
	const setBoardId = useBoardStore((state) => state.setBoardId);

	const setSelectedBoard = useBoardStore((state) => state.setSelectedBoard);

	const addInputField = () => {
		const newInputFields = [...columnsInput];
		const newId = newInputFields.length + 1;
		newInputFields.push({ id: newId, placeholder: 'e.g. New Column' });
		setColumnsInput(newInputFields);
	};

	const removeInputField = (idxToRemove: number) => {
		const updatedInputs = columnsInput.filter((_, idx) => idx !== idxToRemove);
		setColumnsInput(updatedInputs);
	};

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsAddNewBoardModalOpen(false));

	const labelClass = 'text-body text-medium-grey dark:text-white font-bold';
	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full';

	const btnAddColumnClass =
		'bg-purple bg-opacity-10 dark:bg-white dark:bg-opacity-100 text-purple text-13px font-bold py-2 w-full rounded-full';
	const btnAddColumnText = '+ Add New Column';

	const btnAddNewBoardClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full mt-6';
	const btnAddNewBoardText = 'Create New Board';

	const errorClass = 'text-red text-l-body absolute right-[3.4rem] mt-[2.2rem]';

	const columnSchema = z.object({
		column_name: z.string().max(50).optional(),
	});

	const boardAndColumnsSchema = z.object({
		user_id: z.number().optional(),
		board_name: z.string().max(50).nonempty({ message: "Can't be empty" }),
		columns: z.array(columnSchema),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<BoardSubmit>({
		resolver: zodResolver(boardAndColumnsSchema),
	});

	const submitData: SubmitHandler<BoardSubmit> = async (data: BoardSubmit) => {
		data.user_id = userId;
		const response = await addNewBoard(data);

		setSelectedBoard(response.board.name);
		setBoardId(response.board.board_id);
		setIsAddNewBoardModalOpen(false);

		reset();
	};

	const onSubmit = handleSubmit(submitData);

	return (
		<div className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div
				className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-4 w-screen tablet:mx-0 tablet:w-[30rem]"
				ref={modalRef}
			>
				<form id="newBoardForm" onSubmit={onSubmit}>
					<h1 className="text-l-heading mb-6 dark:text-white">Add New Board</h1>
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
							placeholder="e.g. Web Design"
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
									placeholder={input.placeholder}
									defaultValue=""
								/>
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
						buttonClass={btnAddNewBoardClass}
						buttonText={btnAddNewBoardText}
						type="submit"
					/>
				</form>
			</div>
		</div>
	);
};

export default AddNewBoardModal;

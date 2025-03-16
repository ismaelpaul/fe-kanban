import { useRef } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { motion } from 'framer-motion';

import { zodResolver } from '@hookform/resolvers/zod';

import { useBoardStore } from '@/store/boards';
import { useModalStore } from '@/store/modals';

import { useClickOutside, useWebSocket } from '@/hooks';

import { ColumnSubmit } from '@/models/Column';

import { ColumnsInput } from '@/interfaces/IColumn';

import { TextInput } from '@/components/Input/TextInput';
import { Button } from '@/components/Button';
import { Overlay } from '@/components/Overlay';

const AddNewColumnModal = () => {
	const selectedBoard = useBoardStore((state) => state.selectedBoard);
	const boardId = selectedBoard.board_id;

	const { closeModal } = useModalStore();

	const { sendMessage } = useWebSocket();

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => closeModal('addNewColumnModal'));

	const btnAddNewColumnClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full mt-6 hover:bg-purple-hover';
	const btnAddNewColumnText = 'Add New Column';
	const labelClass = 'text-body text-medium-grey dark:text-white font-bold';
	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 mt-3 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';
	const errorClass = 'text-red text-l-body absolute';

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(ColumnSubmit),
	});

	const submitData: SubmitHandler<Partial<ColumnsInput>> = async (data) => {
		const newColumn = [data];

		const payload = {
			type: 'ADD_NEW_COLUMN',
			payload: {
				boardId: boardId,
				column: newColumn[0].name,
			},
		};

		sendMessage(payload.type, payload.payload);

		reset();

		closeModal('addNewColumnModal');
	};

	const onSubmit = handleSubmit(submitData);

	return (
		<Overlay>
			<motion.dialog
				aria-modal="true"
				open
				initial={{ scale: 0.7 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-4 w-screen tablet:mx-0 tablet:w-[30rem] relative"
				ref={modalRef}
				role="dialog"
				aria-labelledby="modal-heading"
			>
				<h1 id="modal-heading" className="text-l-heading mb-6 dark:text-white">
					Add New Column
				</h1>
				<form id="column-form" onSubmit={onSubmit}>
					<label htmlFor="name" className={labelClass}>
						Column Name
					</label>
					<TextInput
						register={register}
						name="name"
						className={`${inputClass} ${
							errors.name ? 'border border-red/100' : ''
						}`}
						placeholder={'eg. Urgent'}
					/>
					{errors.name && (
						<span className={`${errorClass} right-10 bottom-[5.8rem]`}>
							<span>{errors.name.message?.toString()}</span>
						</span>
					)}
				</form>
				<Button
					form={'column-form'}
					buttonClass={btnAddNewColumnClass}
					buttonText={btnAddNewColumnText}
					type="submit"
				/>
			</motion.dialog>
		</Overlay>
	);
};

export { AddNewColumnModal };

import { useRef } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { motion } from 'framer-motion';

import { zodResolver } from '@hookform/resolvers/zod';

import { useQueryClient } from '@tanstack/react-query';

import { addNewColumnsByBoardId } from '@/api/kanbanApi';

import useBoardStore from '@/store/boardStore';

import { useClickOutside } from '@/hooks';

import { ColumnSubmit } from '@/models/Column';

import { ColumnsInput } from '@/interfaces/IColumn';

import { TextInput } from '@/components/Input/TextInput';
import { Button } from '@/components/Button';

interface AddNewColumnModalPros {
	setIsAddNewColumnModalOpen: (arg: boolean) => void;
}
const AddNewColumnModal = ({
	setIsAddNewColumnModalOpen,
}: AddNewColumnModalPros) => {
	const selectedBoard = useBoardStore((state) => state.selectedBoard);
	const boardId = selectedBoard.board_id;

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsAddNewColumnModalOpen(false));

	const queryClient = useQueryClient();

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

		await addNewColumnsByBoardId(boardId, newColumn);

		reset();
		setIsAddNewColumnModalOpen(false);
		queryClient.invalidateQueries(['columns', boardId]);
	};

	const onSubmit = handleSubmit(submitData);

	return (
		<aside className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
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
		</aside>
	);
};

export { AddNewColumnModal };

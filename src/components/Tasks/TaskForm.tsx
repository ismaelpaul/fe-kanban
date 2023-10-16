import { useState } from 'react';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Cross from '../SVGComponents/Cross';
import { IColumns, SingleColumn } from '../../interfaces/IColumn';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TaskSubmit } from '../../interfaces/ITask';
import { addNewTask, getColumnsByBoardId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import useBoardStore from '../../store/boardStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';

interface TaskFormProps {
	setIsAddNewTaskModalOpen: (arg: boolean) => void;
}
const TaskForm = ({ setIsAddNewTaskModalOpen }: TaskFormProps) => {
	const [subtasksInput, setSubtasksInput] = useState([
		{ id: 1, placeholder: 'e.g. Make coffee' },
		{ id: 2, placeholder: 'e.g. Drink coffee' },
	]);

	const queryClient = useQueryClient();

	const boardId = useBoardStore((state) => state.boardId);

	const queryKey = ['columns', boardId];

	const { data } = useFetch({
		queryKey: queryKey,
		queryFn: () => getColumnsByBoardId(boardId),
	});

	const { columns }: IColumns = data || { columns: [] };

	const options = columns.map((column: SingleColumn) => {
		return (
			{ id: column.column_id, label: column.name, value: column.name } || {}
		);
	});

	const [selectedOption, setSelectedOption] = useState(options[0]);

	const subtaskSchema = z.object({
		subtask_title: z.string(),
		is_completed: z.boolean().default(false),
	});

	const taskAndSubtaskSchema = z.object({
		column_id: z.number().optional(),
		title: z.string().nonempty({ message: "Can't be empty" }),
		description: z.string(),
		status: z.string(),
		subtasks: z.array(subtaskSchema),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskSubmit>({
		resolver: zodResolver(taskAndSubtaskSchema),
	});

	const submitData: SubmitHandler<TaskSubmit> = async (data) => {
		data.column_id = selectedOption.id;
		data.status = selectedOption.value;

		const columnId = selectedOption.id;

		await addNewTask(data);

		reset();

		setIsAddNewTaskModalOpen(false);

		queryClient.invalidateQueries(['tasks', columnId]);
	};

	const onSubmit = handleSubmit(submitData);

	const labelClass = 'text-body text-medium-grey dark:text-white font-bold';
	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full';

	const btnAddSubtaskClass =
		'bg-purple bg-opacity-10 dark:bg-white dark:bg-opacity-100 text-purple text-13px font-bold py-2 w-full rounded-full';
	const btnAddSubtaskText = '+ Add New Subtask';

	const errorClass =
		'text-red text-l-body absolute right-[12.7rem] mt-[2.2rem]';

	const addInputField = () => {
		const newInputFields = [...subtasksInput];
		const newId = newInputFields.length + 1;
		newInputFields.push({ id: newId, placeholder: 'e.g. New Subtask' });
		setSubtasksInput(newInputFields);
	};

	const removeInputField = (idxToRemove: number) => {
		const updatedInputs = subtasksInput.filter((_, idx) => idx !== idxToRemove);
		setSubtasksInput(updatedInputs);
	};

	return (
		<>
			<form id="task-form" onSubmit={onSubmit}>
				<div className="flex flex-col gap-2 mb-6">
					<label htmlFor="title" className={labelClass}>
						Title
					</label>
					<input
						id="title"
						{...register('title')}
						name="title"
						type="text"
						placeholder="e.g. Take coffee break"
						className={inputClass}
					/>
					{errors.title && (
						<span className={errorClass}>{errors.title.message}</span>
					)}
				</div>
				<div className="flex flex-col gap-2 mb-6">
					<label htmlFor="description" className={labelClass}>
						Description
					</label>
					<textarea
						id="description"
						{...register('description')}
						name="description"
						placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
						className={`${inputClass} h-28`}
					/>
				</div>
				<div>
					<label className={`${labelClass} inline-block mb-2`}>Subtasks</label>
					{subtasksInput.map((input, idx) => {
						const subtaskTitleKey =
							`subtasks[${idx}].subtask_title` as keyof TaskSubmit;
						return (
							<div key={idx} className="flex items-center gap-4 mb-3">
								<input
									{...register(subtaskTitleKey)}
									name={`subtasks[${idx}].subtask_title`}
									className={inputClass}
									placeholder={input.placeholder}
								/>
								<div onClick={() => removeInputField(idx)}>
									<Cross />
								</div>
							</div>
						);
					})}
				</div>
				<Button
					onClick={addInputField}
					type={'button'}
					buttonClass={btnAddSubtaskClass}
					buttonText={btnAddSubtaskText}
				/>
				<div className="my-6">
					<label className={labelClass}>Status</label>
					<input
						id="status"
						type="hidden"
						{...register('status')}
						value={selectedOption.value}
						onChange={(e) => {
							console.log('Selected Status Value:', e.target.value);
						}}
					/>
					{errors.status && (
						<span className={errorClass}>{errors.status.message}</span>
					)}
					<Dropdown
						isDisabled={false}
						options={options}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
					/>
				</div>
			</form>
		</>
	);
};

export default TaskForm;

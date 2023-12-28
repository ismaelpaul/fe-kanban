import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Cross from '../SVGComponents/Cross';
import { IColumns, SingleColumn } from '../../interfaces/IColumn';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TaskSubmit } from '../../interfaces/ITask';
import { getColumnsByBoardId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import useBoardStore from '../../store/boardStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { SubtaskInput } from '../../interfaces/ISubtask';
import { TaskSubmitSchema } from '../../models/Task';
import TextInput from '../Input/TextInput';
import TextAreaInput from '../Input/TextAreaInput';
import {
	addNewTaskSubmission,
	editTaskSubmission,
} from '../../utils/Task/TaskSubmission';

interface TaskFormProps {
	setIsAddNewTaskModalOpen?: (arg: boolean) => void;
	initialValue?: TaskSubmit;
	isNewTask: boolean;
}
const TaskForm = ({
	setIsAddNewTaskModalOpen,
	initialValue,
	isNewTask,
}: TaskFormProps) => {
	const [subtasksInput, setSubtasksInput] = useState<SubtaskInput[]>([]);

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

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(TaskSubmitSchema),
		defaultValues: initialValue,
	});

	const submitData: SubmitHandler<TaskSubmit> = async (data) => {
		if (isNewTask) {
			addNewTaskSubmission(data, selectedOption, queryClient);
			setIsAddNewTaskModalOpen!(false);
		} else {
			data.task_id = initialValue?.task_id;
			editTaskSubmission(data, selectedOption, initialValue);
		}

		reset();
	};

	const onSubmit = handleSubmit(submitData);

	const labelClass = 'text-body text-medium-grey dark:text-white font-bold';
	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';

	const btnAddSubtaskClass =
		'bg-purple bg-opacity-10 dark:bg-white dark:bg-opacity-100 text-purple text-13px font-bold py-2 w-full rounded-full';
	const btnAddSubtaskText = '+ Add New Subtask';

	const errorClass = 'text-red text-l-body absolute ';

	const addInputField = () => {
		const newId = subtasksInput.length + 1;
		const newSubtask = {
			subtask_id: newId,
			title: '',
			placeholder: 'e.g. New Subtask',
			is_completed: false,
			is_new: true,
		};

		setSubtasksInput((prevSubtasksInput) => {
			const updatedSubtasks = [...prevSubtasksInput, newSubtask];

			// Update form values and trigger revalidation
			setValue(`subtasks.${updatedSubtasks.length - 1}`, newSubtask);

			return updatedSubtasks;
		});
	};

	const removeInputField = (idxToRemove: number) => {
		setSubtasksInput((prevState) =>
			prevState.filter((_, idx) => idx !== idxToRemove)
		);

		// Update form values and trigger revalidation
		setValue(
			`subtasks`,
			subtasksInput.filter((_, idx) => idx !== idxToRemove)
		);
	};

	useEffect(() => {
		if (initialValue) {
			setSelectedOption({
				id: initialValue.column_id,
				label: initialValue.status,
				value: initialValue.status,
			});
			setSubtasksInput(initialValue.subtasks);
		} else {
			setSubtasksInput([
				{
					subtask_id: 1,
					title: '',
					placeholder: 'e.g. Make coffee',
					is_completed: false,
					is_new: true,
				},
				{
					subtask_id: 2,
					title: '',
					placeholder: 'e.g. Drink coffee',
					is_completed: false,
					is_new: true,
				},
			]);
		}
	}, [initialValue]);

	return (
		<>
			<form id="task-form" onSubmit={onSubmit}>
				<div className="flex flex-col gap-2 mb-6 relative">
					<label htmlFor="title" className={labelClass}>
						Title
					</label>
					<TextInput
						register={register}
						name="title"
						className={`${inputClass} ${
							errors.title ? 'border border-red border-opacity-100' : ''
						}`}
						placeholder="e.g. Take coffee break"
						defaultValue={initialValue?.title || ''}
					/>
					{errors.title && (
						<span className={`${errorClass} right-6 mt-[2.1rem]`}>
							{errors.title.message}
						</span>
					)}
				</div>
				<div className="flex flex-col gap-2 mb-6">
					<label htmlFor="description" className={labelClass}>
						Description
					</label>
					<TextAreaInput
						register={register}
						name={'description'}
						className={`${inputClass} h-28`}
						defaultValue={initialValue?.description || ''}
						placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
					/>
				</div>
				<div>
					<label className={`${labelClass} inline-block mb-2`}>Subtasks</label>
					{subtasksInput.map((subtask, idx) => {
						return (
							<div key={idx} className="flex items-center gap-4 mb-3 relative">
								<TextInput
									register={register}
									name={`subtasks.${idx}.title`}
									className={`${inputClass} ${
										errors.subtasks?.[idx]
											? 'border border-red border-opacity-100'
											: ''
									}`}
									placeholder={subtask.placeholder}
									defaultValue={subtask.title}
								/>
								{errors.subtasks && (
									<span className={`${errorClass} right-14`}>
										{errors.subtasks[idx]?.title?.message}
									</span>
								)}
								<div
									className="cursor-pointer"
									onClick={() => removeInputField(idx)}
								>
									<Cross isError={errors.subtasks?.[idx] != null} />
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
						defaultValue={selectedOption.value}
					/>
					{errors.status && (
						<span className={errorClass}>{errors.status.message}</span>
					)}
					<Dropdown
						options={options}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
						isParentTaskModal={false}
					/>
				</div>
			</form>
		</>
	);
};

export default TaskForm;

import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { TaskSubmit } from '@/interfaces/ITask';
import { SubtaskInput } from '@/interfaces/ISubtask';
import { IToastTypes } from '@/interfaces/IToast';
import { SingleColumn } from '@/interfaces/IColumn';

import { useToast, useWebSocket } from '@/hooks';

import { TaskSubmitSchema } from '@/models/Task';
import { editTaskSubmission } from '@/utils/Task/taskSubmission';

import { TextInput } from '@/components/Input/TextInput';
import { TextAreaInput } from '@/components/Input/TextAreaInput';
import { Cross } from '@/components/SVGComponents/Cross';
import { Button } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import { useBoardStore } from '@/store/boards';

interface TaskFormProps {
	setIsAddNewTaskModalOpen?: (arg: boolean) => void;
	setIsEditTaskModalOpen?: (arg: boolean) => void;
	taskData?: Partial<TaskSubmit>;
	isNewTask: boolean;
}
const TaskForm = ({
	setIsAddNewTaskModalOpen,
	setIsEditTaskModalOpen,
	taskData,
	isNewTask,
}: TaskFormProps) => {
	const [subtasksInput, setSubtasksInput] = useState<SubtaskInput[]>([]);
	const [subtasksToDelete, setSubtasksToDelete] = useState<number[]>([]);

	const queryClient = useQueryClient();

	const { sendMessage } = useWebSocket();

	const toast = useToast();

	const selectedBoard = useBoardStore((state) => state.selectedBoard);

	const boardId = selectedBoard.board_id;

	const options = useMemo(() => {
		const cachedColumns = queryClient.getQueryData<{ columns: SingleColumn[] }>(
			['columns', boardId]
		);

		const columns = cachedColumns?.columns || [];

		return columns.map((column: SingleColumn) => ({
			id: column.column_id,
			label: column.name,
			value: column.name,
		}));
	}, [boardId]);

	const [selectedOption, setSelectedOption] = useState(options[0]);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(TaskSubmitSchema),
		defaultValues: taskData,
	});

	const submitData: SubmitHandler<Partial<TaskSubmit>> = async (
		newTaskData
	) => {
		if (isNewTask) {
			const payload = {
				type: 'ADD_NEW_TASK',
				payload: {
					task: newTaskData,
					column_id: selectedOption.id,
				},
			};
			sendMessage(payload.type, payload.payload);
			setIsAddNewTaskModalOpen!(false);
		} else {
			const payload = editTaskSubmission(
				newTaskData,
				selectedOption,
				taskData,
				subtasksToDelete
			);

			sendMessage(payload.type, payload.payload);

			setIsEditTaskModalOpen!(false);
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

	const removeInputField = (
		idxToRemove: number,
		subtaskId: number,
		toast: IToastTypes
	) => {
		if (!isNewTask) {
			toast.warning(
				'Removing columns will also remove its related info such as tasks and subtasks'
			);
		}
		setSubtasksToDelete([...subtasksToDelete, subtaskId]);

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
		if (taskData) {
			setSelectedOption({
				id: taskData.column_id ?? 0,
				label: taskData.status ?? 'Select Status',
				value: taskData.status ?? 'Status',
			});
			if (taskData.subtasks) {
				setSubtasksInput(taskData.subtasks);
			}
			setValue('title', taskData.title);
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
	}, [taskData, setValue]);

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
							errors.title ? 'border border-red/100' : ''
						}`}
						placeholder="e.g. Take coffee break"
						defaultValue={taskData?.title}
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
						defaultValue={taskData?.description}
						placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
					/>
				</div>
				<div>
					<label className={`${labelClass} inline-block mb-2`}>Subtasks</label>
					{subtasksInput.map((subtask, idx) => {
						return (
							<div key={idx} className="flex items-center gap-4 mb-3 relative">
								<input
									{...register(`subtasks.${idx}.subtask_id`, {
										valueAsNumber: true,
									})}
									defaultValue={Number(subtask.subtask_id)}
									type="hidden"
								/>
								<TextInput
									register={register}
									name={`subtasks.${idx}.title`}
									className={`${inputClass} ${
										errors.subtasks?.[idx] ? 'border border-red/100' : ''
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
									onClick={() =>
										removeInputField(idx, subtask?.subtask_id, toast)
									}
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
						defaultValue={selectedOption?.value}
					/>
					{errors.status && (
						<span className={errorClass}>{errors.status.message}</span>
					)}
					<Dropdown
						options={options}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
						disabled={false}
					/>
				</div>
			</form>
		</>
	);
};

export { TaskForm };

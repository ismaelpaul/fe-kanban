import { QueryClient } from '@tanstack/react-query';
import { addNewTask } from '../../api/kanbanApi';
import { TaskStatusDropdown, TaskSubmit } from '../../interfaces/ITask';

export const addNewTaskSubmission = async (
	data: TaskSubmit,
	selectedOption: TaskStatusDropdown,
	queryClient: QueryClient
) => {
	data.column_id = selectedOption.id;
	data.status = selectedOption.value;

	const subtasks = data.subtasks;
	subtasks.forEach((subtask) => {
		delete subtask.placeholder;
		delete subtask.subtask_id;
		delete subtask.is_new;
	});

	await addNewTask(data);

	const columnId = selectedOption.id;
	queryClient.invalidateQueries(['tasks', columnId]);
};
